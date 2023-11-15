import AppError from "@utils/appError";
import { successResponseTemplate } from "@utils/boilerplate/response";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
/**
 * @class ErrorHandler class
 */
class ErrorHandler {
  sendErrorDev(err: AppError, req: Request, res: Response): Response {
    //  A) This Applies all api that starts with
    console.log(err);
    return successResponseTemplate(res, err.statusCode || 500, err.message, {
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
  sendErrorProd(err: AppError, req: Request, res: Response): Response {
    return this.__sendProd(err, req, res);
  }

  // private

  /**
   * @note this is just a sub function of the SendErrorProd
   */
  private __sendProd(err: AppError, req: Request, res: Response): Response {
    if (err.isOperational) {
      return successResponseTemplate(res, err.statusCode || 500, err.message, {
        status: err.status,
        message: err.message,
      });
    }

    return this.renderGenericError(res);
  }
  private renderGenericError(res: Response) {
    return successResponseTemplate(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went very wrong!",
      {
        status: "error",
      }
    );
  }
}

export default new ErrorHandler();
