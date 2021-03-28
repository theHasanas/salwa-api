const { User } = require("../../db/models");

//bcrypt
const bcrypt = require("bcrypt");

//webtoken
const jwt = require("jsonwebtoken");

exports.checkUsername = async (req, res, next) => {
  try {
    let available = true;
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user) available = false;

    res.json({ available });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(req.body.password, saltRounds);

    req.body.password = hashedpassword;

    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      admin: newUser.admin,
      exp: Date.now() + 30000,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  console.log(`Attempting login for ${req.user.username}`);

  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    admin: user.admin,
    exp: Date.now() + 600000, // the token will expire 15 minutes from when it's generated
  };
  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  res.json({ token: token });
};

exports.secret = (req, res, next) => {
  res.json({ secret: req.user.secret });
};

exports.secretParam = async (req, res, next) => {
  const secretUserId = req.params.userId;

  try {
    const user = await User.findByPk(secretUserId);

    if (req.user.id === +secretUserId || req.user.admin) {
      res.json({ username: user.username, secret: user.secret });
    } else {
      res.json({ username: user.username });
    }
  } catch (error) {
    next(error);
  }
};
