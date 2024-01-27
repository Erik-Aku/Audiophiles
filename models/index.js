// import models
const User = require("./users.js");
const FriendTag = require("./FriendTag");
const MusicTag = require("./MusicTags");
const Music = require("./Music");

// user-to-user self-referencing many-to-many association
User.hasMany(FriendTag, {
  as:"UserHasFriendTag",
  foreignKey: "friend_id",
});

FriendTag.belongsTo(User, {
  as:"FriendBelongsToUser",
  foreignKey: "user_id",
});

User.belongsToMany(User, {
  as: "UserToUser",
  through: FriendTag,
  foreignKey: "user_id",
});

User.belongsToMany(User, {
  as: "UserFromUser",
  through:FriendTag,
  foreignKey: "friend_id",
});

// user-to-music many-to-many association
User.belongsToMany(Music, {
  through: MusicTag,
  foreignKey: "user_id",
});

Music.belongsToMany(User, {
  through: MusicTag,
  foreignKey: "music_id",
});

Music.hasMany(MusicTag,{
  foreignKey: "music_id",
})

module.exports = {
  User,
  FriendTag,
  MusicTag,
  Music,
};
