import http from 'node:http';
import app from './app.js';
import { env } from './config/env.js';
import './modules/school/school.listeners.js';

const server = http.createServer(app);

server.listen(env.port, () => {
  console.log(`Server is running on http://localhost:${env.port}`);
});
