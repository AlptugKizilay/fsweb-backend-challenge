const express = require('express');
const { restricted } = require("../api/auth/auth-middleware");

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const postRouter = require('./posts/posts-router');
const commentRouter = require('./comments/comments-router');
const LikeRouter = require('./likes/likes-routers');


const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users',userRouter);
server.use('/api/posts',postRouter);
server.use('/api/comments',commentRouter);
server.use('/api/likes',LikeRouter);




module.exports = server;