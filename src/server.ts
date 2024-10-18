import http, { IncomingMessage, ServerResponse } from 'node:http';
import router from './routes/router.ts';




// const users: User[] = [];

// const sendResponse = (res: ServerResponse, statusCode: number, data: any) => {
//   res.writeHead(statusCode, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify(data));
// };

// const getRequestData = (req: IncomingMessage): Promise<User> => {
//   return new Promise((resolve, reject) => {
//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       try {
//         resolve(body ? JSON.parse(body) : {});
//       } catch {
//         reject(new Error('Invalid JSON'));
//       }
//     });

//     req.on('error', (error) => {
//       reject(error);
//     });
//   });
// };

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  // const method = req.method;
  // const parsedUrl = url.parse(req?.url || '', true);
  // const path = parsedUrl.pathname || '';
  // const parts = path.split('/').filter(Boolean);
  // console.log('parts', parts);

  router(req, res);
  // if (!path.startsWith('/api/users')) {
  //   sendResponse(res, 404, { error: 'Not found' });
  //   return;
  // }

  // if (method === 'GET' && path.startsWith('/api/users')) {
  //   const userId = parts[2];

  //   if (!userId) {
  //     sendResponse(res, 200, { users });
  //     return;
  //   }

  //   if (validateUUID(userId)) {
  //     const user = users.find((user) => user.id === userId);
  //     if (user) {
  //       sendResponse(res, 200, { user });
  //     } else {
  //       sendResponse(res, 404, { error: 'User not found' });
  //     }
  //   } else {
  //     sendResponse(res, 400, { error: 'Invalid user ID' });
  //   }
  // }

  // if (method === 'PUT' && path.startsWith('/api/users')) {
  //   const userId = parts[2];

  //   if (validateUUID(userId)) {
  //     const user = users.find((user) => user.id === userId);

  //     if (!user) {
  //       sendResponse(res, 404, { error: 'User not found' });
  //       return;
  //     }

  //     const data = await getRequestData(req);
  //     const { username, age, hobbies } = data;

  //     if (!username || !age || !hobbies) {
  //       sendResponse(res, 400, { error: 'Missing required fields' });
  //       return;
  //     }

  //     if (typeof username !== 'string') {
  //       sendResponse(res, 400, { error: 'Username must be a string' });
  //       return;
  //     }

  //     if (typeof age !== 'number') {
  //       sendResponse(res, 400, { error: 'Age must be a number' });
  //       return;
  //     }

  //     if (!Array.isArray(hobbies) || hobbies.some((hobby) => typeof hobby !== 'string')) {
  //       sendResponse(res, 400, { error: 'Hobbies must be an array of strings' });
  //       return;
  //     }

  //     const updatedUser = { ...user, username, age, hobbies };
  //     users.splice(users.indexOf(user), 1, updatedUser);

  //     sendResponse(res, 200, { user: updatedUser });
  //   } else {
  //     sendResponse(res, 400, { error: 'Missing user ID' });
  //   }
  // }

  // if (method === 'POST' && path === '/api/users') {
  //   const data = await getRequestData(req);
  //   const { username, age, hobbies } = data;

  //   if (!username || !age || !hobbies) {
  //     sendResponse(res, 400, { error: 'Missing required fields' });
  //     return;
  //   }

  //   if (typeof username !== 'string') {
  //     sendResponse(res, 400, { error: 'Username must be a string' });
  //     return;
  //   }

  //   if (typeof age !== 'number') {
  //     sendResponse(res, 400, { error: 'Age must be a number' });
  //     return;
  //   }

  //   if (!Array.isArray(hobbies) || hobbies.some((hobby) => typeof hobby !== 'string')) {
  //     sendResponse(res, 400, { error: 'Hobbies must be an array of strings' });
  //     return;
  //   }

  //   const newUser = { id: uuidv4(), username, age, hobbies };
  //   users.push(newUser);
  //   sendResponse(res, 201, { user: newUser });
  // }

  // if (method === 'DELETE' && path.startsWith('/api/users')) {
  //   const userId = parts[2];

  //   if (!userId) {
  //     sendResponse(res, 400, { error: 'Missing user ID' });
  //     return;
  //   }

  //   if (validateUUID(userId)) {
  //     const user = users.find((user) => user.id === userId);
  //     if (user) {
  //       users.splice(users.indexOf(user), 1);
  //       sendResponse(res, 204, null);
  //     } else {
  //       sendResponse(res, 404, { error: 'User not found' });
  //     }
  //   } else {
  //     sendResponse(res, 400, { error: 'Invalid user ID' });
  //   }
  // }
});


server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});