import http from 'node:http';
import app from './app.js';
import  env  from './config/env.js';
import './modules/auth/auth.listeners.js';
import './modules/parent/parent.listeners.js';
import './modules/payments/payments.listeners.js';
import './modules/school/school.listeners.js';
import './modules/student/student.listeners.js';
import './modules/teacher/teacher.listeners.js';

const server = http.createServer(app);
















/**
 * Start the HTTP server for the application.
 */
server.listen(env.port, () => {
  console.log(`------------------------------------\nServer is running on http://localhost:${env.port}\n------------------------------------`);
});
