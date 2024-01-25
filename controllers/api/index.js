const router = require("express").Router();
const userRoute = require("./userRoute.js");
const musicRoute = require("./musicRoute.js");
const friendTagRoute = require("./friendTag-route.js");

router.use("/users", userRoute);
router.use("/music", musicRoute);
router.user("/friendTag", friendTagRoute);

module.exports = router;
