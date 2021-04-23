const express = require('express')
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");


const userRouter = require("../user/user-router");


const postRouter = require("../routers/post-router");

const commentRouter = require("../routers/comment-router");
/* ROUTER FILE PATH
const notificationRouter = require("../routers/notification-router.js");
*/
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.json());
server.use(helmet());
server.use(morgan("tiny"));
server.use(cors());


server.use("/api/auth", userRouter);
server.use("/api/post", postRouter);
server.use("/api/comment", commentRouter);
/* Connect router to endpoint
server.use("/api/notification", notificationRouter);
*/

const PORT = process.env.PORT || 9500;

server.get("/", (req, res) =>
  res.send(`<------ MATRIX SERVER PORT ${PORT} ------>`)
);

module.exports = server;