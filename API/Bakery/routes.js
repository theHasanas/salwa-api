const express = require("express");

//multer
const upload = require("../../middleware/multer");

//router
const router = express.Router();

//controllers
const {
  bakeryList,
  bakeryCreate,
  bakeryUpdate,
  bakeryDelete,
  fetchBakery,
  cookieCreate,
} = require("./controllers");

//middleware
router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("BafetchBakery Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", bakeryList);
router.post("/", upload.single("image"), bakeryCreate);
router.put("/:bakeryId", bakeryUpdate);
router.delete("/:bakeryId", bakeryDelete);
router.post("/:bakeryId/cookies", upload.single("image"), cookieCreate);

module.exports = router;
