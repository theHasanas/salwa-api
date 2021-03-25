//db
const { Bakery } = require("../../db/models");
const { Cookie } = require("../../db/models");

//fetch a bakery
exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

//bakery list
exports.bakeryList = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: ["id", "name"],
      include: {
        model: Cookie,
        as: "cookies",
        attributes: ["id"],
      },
    });
    res.json(bakeries);
  } catch (err) {
    next(err);
  }
};

//add new bakery
exports.bakeryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newBakery = await Bakery.create(req.body);
    res.status(201).json(newBakery);
  } catch (err) {
    next(err);
  }
};
//update bakery
exports.bakeryUpdate = async (req, res, next) => {
  try {
    await req.bakery.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

//delete bakery
exports.bakeryDelete = async (req, res, next) => {
  try {
    await req.bakery.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

//add new cookie
exports.cookieCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.bakeryId = req.bakery.id;
    const newCookie = await Cookie.create(req.body);
    res.status(201).json(newCookie);
  } catch (err) {
    next(err);
  }
};
