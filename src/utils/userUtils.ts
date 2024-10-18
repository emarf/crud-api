import { IncomingMessage } from "http";
import { User } from "../models/userModal.ts";

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

const userUtils = {
  collectUserData
};

export default userUtils;