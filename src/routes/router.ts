import { IncomingMessage, ServerResponse } from "node:http";
import url from 'node:url';
import userController from "../controllers/userController";
import { RequestMethod, StatusCode } from "../utils/constants";

const router = (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method;
  const parsedUrl = url.parse(req?.url || '', true);
  let path = parsedUrl.pathname || '';

  path = path.replace(/\/+$/, '');
  const parts = path.split('/').filter(Boolean);

  if (method === RequestMethod.GET && parts[0] === 'api' && parts[1] === 'users' && parts[2]) {
    const userId = parts[2];
    userController.getUser(req, res, userId);
  } else if (method === RequestMethod.GET && path === '/api/users') {
    userController.getUsers(req, res);
  } else if (method === RequestMethod.POST && path === '/api/users') {
    userController.createUser(req, res);
  } else if (method === RequestMethod.PUT && parts[0] === 'api' && parts[1] === 'users' && parts[2]) {
    const userId = parts[2];
    userController.updateUser(req, res, userId);
  } else if (method === RequestMethod.DELETE && parts[0] === 'api' && parts[1] === 'users' && parts[2]) {
    const userId = parts[2];
    userController.deleteUser(req, res, userId);
  } else {
    res.statusCode = StatusCode.NOT_FOUND;
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
};


export default router;