const express = require('express');
const { restricted } = require("../api/auth/auth-middleware");

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');


const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users',userRouter);



module.exports = server;