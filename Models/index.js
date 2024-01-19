// import models
const User = require("./user");
const FriendTag = require("./FriendTag");
const MusicTag = require("./MusicTags");
const Music = require("./Music");

User.hasMany(FriendTag, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

FriendTag.belongsto(User, {
  foreignKey: "user_id",
});

User.belongstoMany(Music, {
  through: MusicTag,
  foreignKey: "user_id",
});

Music.belongstoMany(User, {
  through: MusicTag,
  foreignKey: "music_id",
});

module.exports = {
  User,
  FriendTag,
  MusicTag,
  Music,
};
