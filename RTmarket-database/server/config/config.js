/*config는 로컬DB와 운영 DB가 다른 경우가 많기 때문에 
DB를 별도로 구분하여 명시하기 위해 서버의 환경에 맞는 접속정보를 넣는다.
*/
const dotenv = require("dotenv");
// dotenv.config()를 이용하여 .env를 process.env에 적용한다.
dotenv.config();

const config = {
  dev: {
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_SPRINT_PASSWORD,
    database: "cmarket",
  },
  test: {
    host: "localhost",
    user: "root",
    password: process.env.DATABASE_SPRINT_PASSWORD,
    database: "cmarket_test",
  },
};

module.exports = config;
