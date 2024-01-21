const router = require('express').Router();
const apiRoutes = require('./api');
const testRoutes = require('./test');

router.use('/api', apiRoutes);
router.use('/test',testRoutes);


module.exports = router;