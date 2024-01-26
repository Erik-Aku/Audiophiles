
const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/addFriend/:friendId', friendController.addFriend);
router.get('/friends', friendController.getFriends);

module.exports = router;
