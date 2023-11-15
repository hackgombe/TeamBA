import { IUser } from "feel-auth";
import UserModel, { TUserModel } from "@models/userModel";
import AppError from "@utils/appError";
import { StatusCodes } from "http-status-codes";
import * as JwTUtils from "@utils/jwtUtils";
import { CookieOptions, Request, Response } from "express";
import { CookieExpiryTime } from "@utils/cookieTimeObj";
import refreshTokenModel from "@models/refreshTokenModel";
import { ENV } from "@config/env";

async function registerUser(payload: IUser & TUserModel) {
  const { email, password, account_type } = payload;
  const user: (IUser & TUserModel) | null = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (user) {
    throw new AppError(
      "This email already exist, try another one",
      StatusCodes.CONFLICT
    );
  }
  const newUser = new UserModel({
    email,
    password,
    account_type,
  });

  return newUser;
}

async function logInUser(email: string, password: string) {
  const user = await UserModel.findOne({
    email,
  }).select("password");

  if (!user || !(await user?.correctPassword(password, user.password))) {
    throw new AppError("Incorrect Email or Password", StatusCodes.UNAUTHORIZED);
  }

  // Access Token
  const accessToken = JwTUtils.generateToken(user.id, "15m");
  const refreshToken = JwTUtils.generateToken(user.id, "1y");

  return { user: { password, id: user.id }, accessToken, refreshToken };
}

async function verifiedEmail(payload: { email: string; otp: string }) {
  const { email, otp } = payload;
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  }).select("+otpToken +otpExpires");
  if (user) {
    if (!user.otpToken) {
      throw new AppError(
        "Something went wrong!, Please click on resend verification code",
        StatusCodes.FORBIDDEN
      );
    }
    // Check if otp is expired
    if (Date.now() > (user?.otpExpires?.getTime() || 0)) {
      throw new AppError("Your OTP is expired", StatusCodes.FORBIDDEN);
    }

    if (!(await user.correctPassword(otp, user.otpToken))) {
      throw new AppError("Invalid OTP", StatusCodes.UNAUTHORIZED);
    }
    user.otpToken = undefined;
    user.otpExpires = undefined;
    // Verified Email
    user.verifiedEmail = true;
    await user.save({ validateBeforeSave: false });
  }
  return user;
}

export async function createTokens(req: Request, res: Response, data: any) {
  const NewRefreshTokenSchema = await refreshTokenModel.create({
    userId: data.user.id,
    token: data.refreshToken,
    deviceInfo: req.headers["user-agent"],
  });

  if (!NewRefreshTokenSchema) {
    throw new AppError(
      "An error occured trying to log you in. Please try again",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const cookieOptions: CookieOptions = {
    maxAge: Number(CookieExpiryTime.DAY) * 60,
    signed: true,
    encode: (d) => encodeURIComponent(d),
    httpOnly: true,
  };

  res.cookie(
    ENV.COOKIE_SECURE_NAME,
    JSON.stringify({
      accessToken: data.accessToken,
      refreshToken: NewRefreshTokenSchema._id,
    }),
    cookieOptions
  );
}

/**
 *
 * @param req - {Request}
 * @description  this returns the Secure Token Object
 */
function TokenData(req: Request): {
  accessToken: string;
  refreshToken: string;
} {
  let BarearToken = req.headers.authorization;

  if (BarearToken && !BarearToken.startsWith("Bearer ")) {
    throw new AppError(
      "Provide a valid authorisation header",
      StatusCodes.BAD_REQUEST
    );
  }

  const token = BarearToken?.split(" ")[0] || req.signedCookies["__feel-token"];
  const parsedToken = token && JSON.parse(token);
  console.log(token);

  return parsedToken;
}

export { registerUser, logInUser, TokenData, verifiedEmail };
