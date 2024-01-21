const router = require("express").Router();
const userRoutes = require("./userRoute");
//const friendTagRoutes = require("");
//const musicRoutes = require("");
//const musicTagRoutes = require("");

router.use("/user", userRoutes);

module.exports = router;
