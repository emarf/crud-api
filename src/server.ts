import http, { IncomingMessage, ServerResponse } from 'node:http';
import router from './routes/router';

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  router(req, res);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});