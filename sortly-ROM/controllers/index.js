const utils = require("../modules/utils");
const Url = require("../models").url;

module.exports = {
  post: (req, res) => {
    const url = req.body.url;
    //? url,title을 인자로 받아 insert
    const queryInsert = async (err, url, title) => {
      if (err) return res.status(400).send("Invalid Url");

      // return await Url.create({
      //   url,
      //   title,
      //   visits: 1,
      // }).then((obj) => res.status(201).send(obj));

      return await Url.findOrCreate({
        where: {
          url,
        },
        defaultValue: {
          title,
        },
      })
        .then(([result, created]) => {
          if (created) return res.status(201).json(result);
          // created
          else return res.status(201).json(result); // find
        })
        .catch((err) => res.statud(500)); // Server Error
    };
    // req url이 타장한지 검토
    if (!utils.isValidUrl(url)) return res.status(400).send("Invalid Url");

    // url에 get을 하여 title을 받아서 cb에 인자로 넘겨준다. (modules에 선언)
    // title을 인자로 받고 orm 으로 get 요청을 한다. (modules에 선언)
    utils.getTitle(url, queryInsert);
  },
  get: async (req, res) => {
    //   model에 get요청을 한다.
    const url = req.body.url;
    return await Url.findAll().then((obj) => res.status(200).json(obj));
  },
  // redirection: (req, res) => {
  //   // id와 일치하는 url을 redirection해준다.
  //   const params = req.params.id;
  //   const queryRedirect = async (params) => {
  //     await Url.increment({ visits: +1 }, { where: { id: params } });
  //     return await Url.findAll({
  //       raw: true, // 이 옵션을 하면 dataValues만 뽑아온다.
  //       attributes: ["url"],
  //       where: { id: params },
  //     }).then((obj) => {
  //       console.log("uuuuu", obj[0].url); // dataValues에 들어가있다?

  //       return res.redirect(302, obj[0].url);
  //     });
  //   };
  //   queryRedirect(params);
  // },

  redirection: async (req, res) => {
    // id라는 파라미터에 들어온다.
    // 해당 파라미터를 이용하여 url 모델을 조회 -findByPk or findOne
    // 조회 후 success -> 이 url로 redirection
    // visite 1증가
    const urlPk = req.params.id;
    const result = await Url.findByPk(urlPk);
    if (!result) {
      /*204 : no content :The HTTP 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page. 요청하는 resource가 없으므로..
       */
      return res.statud(204);
    } else {
      const url = result.url;
      await result.update({
        visits: result.visits + 1,
      });
      return res.redirect(302, url);
    }
  },
};
