import { ServerResponse } from "http";
import { StatusCode } from "./constants";
import { CustomError, User } from "../models/userModal";

export const throwError = (statusCode: number, message: string): never => {
  throw { statusCode, message };
};

const isCustomError = (error: unknown): error is CustomError => {
  return typeof error === 'object' && error !== null && 'statusCode' in error;
};

export const handleError = (res: ServerResponse, error: unknown): void => {
  if (isCustomError(error)) {
    res.statusCode = error.statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: error.message }));
  } else {
    res.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Internal server error' }));
  }
};

export const filterFalsyUserFields = (obj: Partial<User>): Partial<User> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => Boolean(value))
  );
};
