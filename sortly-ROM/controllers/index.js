const utils = require("../modules/utils");
const Url = require("../models").url;

module.exports = {
  post: (req, res) => {
    const url = req.body.url;
    //? url,title을 인자로 받아 insert
    const queryInsert = async (err, url, title) => {
      if (err) return res.status(500).send("Internal Server Error");

      return await Url.create({
        url,
        title,
        visits: 1,
      }).then((obj) => res.status(201).send(obj));
    };
    // req url이 타장한지 검토
    if (!utils.isValidUrl(url)) return res.status(400).send("Invalid url");

    // url에 get을 하여 title을 받아서 cb에 인자로 넘겨준다. (modules에 선언)
    // title을 인자로 받고 orm 으로 get 요청을 한다. (modules에 선언)
    utils.getTitle(url, queryInsert);
  },
  get: async (req, res) => {
    //   model에 get요청을 한다.
    const url = req.body.url;
    return await Url.findAll().then((obj) => res.status(200).json(obj));
  },
  redirection: (req, res) => {
    // id와 일치하는 url을 redirection해준다.
    const params = req.params.id;
    const queryRedirect = async (params) => {
      await Url.increment({ visits: +1 }, { where: { id: params } });
      return await Url.findAll({
        raw: true, // 이 옵션을 하면 dataValues만 뽑아온다.
        attributes: ["url"],
        where: { id: params },
      }).then((obj) => {
        console.log("uuuuu", obj[0].url); // dataValues에 들어가있다?

        return res.redirect(302, obj[0].url);
      });
    };
    queryRedirect(params);
  },
};
