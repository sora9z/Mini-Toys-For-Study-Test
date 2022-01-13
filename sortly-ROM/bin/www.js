// http server main
//! Module dependencies
const app = require("../app"); // Middleware
// debug는 node 실행 시 지정한 log만 선택하여 볼 수 있다.
const debug = require("debug")("shortly:server");
const request = require("debug")("shortly:request");
const debugt = require("debug");
const http = require("http");

// port 를 가져와서 express에 port를 설정한다.
// process.env에 port속성이 없다면 default로 3000을 사용한다.
// app.set(key,value) 로 데이터를 저장할 수 있다.

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// ! HTTP server를 생성하고 실ㅇ

const server = http.createServer(app); // app또한 request listener 함수이므로 인자로 들어간다 (콜백함수)

//! Listen on provided port, on all network interfaces.

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 * 아 메서드는  port가 number 또는 string 또는 false인 경우 
 * port를 숫자로 변형하려 return 한다.
 *  Executes parseInt, that essentially converts the value to an integer, if possible.
    Checks if the value is not-a-number.
    Checks if is a valid port value.

여기서는 port가  string이라면 named pipe이다.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//! Functions

/**
 * ? Event listener for HTTP server "error" event.
 를 terminal에 치면 나온다.
 * https://github.com/expressjs/generator/issues/72
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe" + port : "Port" + port;

  // Handle specific listen errors
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privilages");
      //EACCES (Permission denied): An attempt was made to access a file in a way forbidden by its file access permissions
      process.exit(1);
      break;

    case "EADDRIMUSE":
      console.error(bind + " is already in use");
      //EADDRINUSE (Address already in use): An attempt to bind a server (net, http, or https) to a local address failed due to another server on the local system already occupying that address.
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * ? Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  // This method return the bound address containing the family name, and port of the server.
  const bind = typeof port === "string" ? "pipe" + addr : "port" + addr.port;
  // console.log("Listening on " + bind);
  debug("Listening on " + bind);
}

// debug test
const debugE = new debugt("error:server");
const debugR = new debugt("error:require");

request("Request is this");
debugR("Request Failure");
debugE("404 Not Found");
