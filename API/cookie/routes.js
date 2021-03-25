const express = require("express");

//multer
const upload = require("../../middleware/multer");

//router
const router = express.Router();

//controllers
const {
  cookieList,
  cookieUpdate,
  cookieDelete,
  fetchCookie,
} = require("./controllers");

//middleware
router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", cookieList);
router.put("/:cookieId", cookieUpdate);
router.delete("/:cookieId", cookieDelete);

module.exports = router;
