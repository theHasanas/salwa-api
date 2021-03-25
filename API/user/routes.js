//express
const express = require("express");

//router
const router = express.Router();

//passport
const passport = require("passport");

const { signup, signin } = require("./controllers");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }), //next session 🔥
  signin
);
module.exports = router;
