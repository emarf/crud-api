import { IncomingMessage, ServerResponse } from "node:http";
import url from 'node:url';
import userController from "../controllers/userController.ts";

const router = (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method;
  const parsedUrl = url.parse(req?.url || '', true);
  const path = parsedUrl.pathname || '';
  const parts = path.split('/').filter(Boolean);

  if (method === 'GET' && path.startsWith('/api/users')) {
    userController.getUsers(req, res);
  } else if (method === 'POST' && path.startsWith('/api/users')) {
    userController.createUser(req, res);
  }
};


export default router;