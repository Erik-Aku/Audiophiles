const { FriendTag } = require("../../models/index");

const friendTagData = [
  {
    user_id: 1,
    friend_id: 2,
  },
  {
    user_id: 1,
    friend_id: 3,
  },
  {
    user_id: 2,
    friend_id: 1,
  },
  {
    user_id: 3,
    friend_id: 1,
  },
];

const seedfriendTag = () => FriendTag.bulkCreate(friendTagData);

module.exports = seedfriendTag;
