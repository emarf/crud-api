import { ServerResponse } from "http";
import { StatusCode } from "./constants";
import { CustomError } from "../models/userModal";

export const throwError = (statusCode: number, message: string): never => {
  throw { statusCode, message };
};

const isCustomError = (error: unknown): error is CustomError => {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
};

export const handleError = (res: ServerResponse, error: unknown): void => {
  if (isCustomError(error)) {
    res.statusCode = error.statusCode;
    res.end(JSON.stringify({ message: error.message }));
  } else {
    res.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
};
