const router = require("express").Router();
const apiRoutes = require("./api/index");
//const testRoutes = require("./test1/index.js");

router.use("/api", apiRoutes);
//router.use("/test", testRoutes);

module.exports = router;
