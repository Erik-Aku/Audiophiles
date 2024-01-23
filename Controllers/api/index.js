const router = require("express").Router();
const userRoute = require("./userRoute");
const musicRoute = require("./musicRoute.js")

router.use("/users", userRoute)
router.use("/music",musicRoute)

module.exports = router;
