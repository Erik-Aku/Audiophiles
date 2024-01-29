const router = require("express").Router();
const userRoute = require("./userRoute.js");
const musicRoute = require("./musicRoute.js");
const friendTagRoute = require("./friendTag-route.js");
const musicTagRoute = require("./musicTag-route.js");

router.use("/users", userRoute);
router.use("/music", musicRoute);
router.use("/friendTag", friendTagRoute);
router.use("/musicTag", musicTagRoute);

module.exports = router;
