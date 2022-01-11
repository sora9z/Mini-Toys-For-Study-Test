const request = require("request");

// 이 regEx는 하나 하나 해석을 해보아야겠다.
const regValidUrl =
  /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

//? getTitle : url을 인자로 받아서 title을 받아온다.
const getTitle = (url, cb) => {
  // 인자로 받은 url로 get 요청을 하고
  // 받아서 callback함수에 인자로 전달한다.
  // 동시에 callback(인자)를 return 하면서 실행한다.
  request(url, (err, res, html) => {
    if (err) {
      console.log("Error on reading url to get title");
      return cb(err);
    } else {
      const tag = /<title>(.*)<\/title>/;
      // <title> tag사이에 있는 공백을 포함한 모든 문자를 그룹으로 묶음
      const match = html.match(tag);
      const title = match ? match[1] : url; // title 을 가져옴
      console.log("test", title);
      return cb(err, url, title);
    }
  });
};

//? request로 받은 url의 형식의 validation function

const isValidUrl = (url) => {
  // 인자로 받은 url이 regValidUrl과 match되는지 확인한다.
  console.log(url.match(regValidUrl));
  return url.match(regValidUrl);
};
module.exports = { getTitle, isValidUrl };
