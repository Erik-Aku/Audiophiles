const router = require("express").Router();
const userRoute = require("./userRoute.js");
const musicRoute = require("./musicRoute.js")

router.use("/users", userRoute);
router.use("/music", musicRoute);

module.exports = router;
