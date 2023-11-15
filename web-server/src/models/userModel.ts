import { IUser, IUserMethods, IUserVirtual, Generics } from "feel-auth";
import { Schema, model, Model } from "mongoose";
import bycrpt from "bcryptjs";
import validate from "validator";
import { generateSixDigitNumber } from "@utils/helpers";
import { CookieExpiryTime } from "@utils/cookieTimeObj";

export type TUserModel = Model<
  IUser,
  {},
  IUserMethods & Generics,
  IUserVirtual
>;

const userSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      lowercase: true,
      unique: true,
      validate: [validate.isEmail, "Please provide a valid email Address"],
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
      lowercase: true,
    },

    gender: { type: String, enum: ["Male", "Female"], lowercase: true },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    status: {
      type: String,
      enum: ["deleted", "suspended", "active"],
      default: "active",
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
    passwordChangedAt: {
      select: false,
      type: Date,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      select: false,
      type: Date,
    },
    otpToken: {
      type: String,
      select: false,
    },
    otpExpires: {
      select: false,
      type: Date,
    },
    nin: {
      type: String,
    },
    tAndC: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

// Middleware

// Virtual Field

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// Handles Password Hashing
userSchema.pre("save", async function (next) {
  // Hash Password
  if (this.isModified("password")) {
    this.password = await bycrpt.hash(this.password, 12);
  }
  next();
});

// Instance Methods

userSchema.method(
  "correctPassword",
  async function correctPassword(userPassword: string, realPassword: string) {
    return bycrpt.compare(userPassword, realPassword);
  }
);

userSchema.method("cleanSensitiveField", async function cleanSensitiveField() {
  const data = this;
  data.password = undefined;
  return data;
});

userSchema.method("createOTP", async function createOTP() {
  const otp = generateSixDigitNumber();
  this.otpToken = await bycrpt.hash(`${otp}`, 12);
  this.otpExpires = CookieExpiryTime.MINUTE * 10 + Date.now();
  return otp;
});

export default model<IUser, TUserModel>("User", userSchema);
