//db
const { Cookie } = require("../../db/models");
const { Bakery } = require("../../db/models");

//fetch a cookie
exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

//cookie list
exports.cookieList = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["id"],
      },
    });
    res.json(cookies);
  } catch (err) {
    next(err);
  }
};

//update cookie
exports.cookieUpdate = async (req, res, next) => {
  try {
    await req.cookie.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

//delete cookie
exports.cookieDelete = async (req, res, next) => {
  try {
    await req.cookie.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
