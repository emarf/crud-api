import { IncomingMessage } from "http";
import { validate as validateUUID } from 'uuid';
import { User } from "../models/userModal";
import { StatusCode } from "./constants";
import { throwError } from "./helpers";

const collectUserData = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
};


const validateUserId = (userId: string): boolean => {
  if (!validateUUID(userId)) {
    throwError(StatusCode.BAD_REQUEST, 'Invalid user ID');
  }

  return true;
};


const validateUserFields = (userData: Partial<User>, isUpdate = false) => {
  const { username, age, hobbies } = userData;

  if (!isUpdate) {
    if (!username || !age || !hobbies) {
      throwError(StatusCode.BAD_REQUEST, 'Missing required fields');
    }
  } else {
    if (!username && !age && !hobbies) {
      throwError(StatusCode.BAD_REQUEST, 'At least one field must be provided');
    }
  }

  if (username && typeof username !== 'string') {
    throwError(StatusCode.BAD_REQUEST, 'Username field must be a string');
  }

  if (age && typeof age !== 'number') {
    throwError(StatusCode.BAD_REQUEST, 'Age field must be a number');
  }

  if (hobbies && (!Array.isArray(hobbies) || hobbies.some((hobby) => typeof hobby !== 'string'))) {
    throwError(StatusCode.BAD_REQUEST, 'Hobbies field must be an array of strings');
  }
};


const userUtils = {
  collectUserData,
  validateUserId,
  validateUserFields,
};

export default userUtils;