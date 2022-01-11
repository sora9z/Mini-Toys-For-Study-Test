// APP.js에서는 server의 middleware와 server와 client를 연결하는 코드가 들어간다.
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes");
const morgan = require("morgan");
const app = express();
const port = 4000;

// middleware - cors , json, router
// save log
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", indexRouter); // root 경로 진입 시 indexRouter로 연결

module.exports = app.listen(port, () => {
  console.log(`✈️ ✈️ ✈️ Server is starting on ${port}`);
});
