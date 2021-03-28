//express
const express = require("express");

//router
const router = express.Router();

//passport
const passport = require("passport");

const {
  signup,
  signin,
  checkUsername,
  secret,
  secretParam,
} = require("./controllers");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }), //next session 🔥
  signin
);

router.get("/secret", passport.authenticate("jwt", { session: false }), secret);

router.get(
  "/secret/:userId",
  passport.authenticate("jwt", { session: false }),
  secretParam
);

router.post("/checkUsername", checkUsername);

module.exports = router;
