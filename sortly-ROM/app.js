// Middleware
const express = require("express");
const logger = require("morgan");
const rootRouter = require("./routes/index");
const linksRouter = require("./routes/links");

const app = express();

app.use(logger("dev")); // dev는 color로 로그를 표시해줌
app.use(express.json()); // json을 해주지 않으면 받은 data를 url로 변환하지 않는다.

app.use(express.urlencoded({ extended: false })); // 이게 없으면 url encodintX?

// route
app.use("/", rootRouter);
app.use("/links", linksRouter);

module.exports = app;
