import { Response } from "express";
import {
  getReasonPhrase,
  getStatusCode,
  ReasonPhrases,
} from "http-status-codes";
/**
 *
 * @param res {Response} This the express response type
 * @param message {string} This is the message you want to pass
 * @param data this can be any data type
 * @returns {Response}
 */
export const successResponseTemplate = (
  res: Response,
  statuscode: number,
  message: string,
  data: any
): Response => {
  return res.status(statuscode).json({
    metaData: {
      author: "Market Version API.",
      date: new Date(),
    },
    results: Array.isArray(data) ? data.length : undefined,
    responseStatus: {
      code: statuscode,
      message: getReasonPhrase(statuscode),
    },
    responseMessage: message,
    responseBody: data,
  });
};
