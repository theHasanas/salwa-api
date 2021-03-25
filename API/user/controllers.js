const { User } = require("../../db/models");

//bcrypt
const bcrypt = require("bcrypt");

//webtoken
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { password } = req.body;
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedpassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + 900000,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    res.json({ token: token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 900000, // the token will expire 15 minutes from when it's generated
  };
  const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
  res.json({ token: token });
};
