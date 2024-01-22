const { MusicTag } = require("../Models/index");

const musicTagData = [
  {
    user_id: 1,
    music_id: 1,
  },
  {
    user_id: 1,
    music_id: 2,
  },
  {
    user_id: 1,
    music_id: 3,
  },
  {
    user_id: 2,
    music_id: 2,
  },
  {
    user_id: 2,
    music_id: 3,
  },
  {
    user_id: 3,
    music_id: 3,
  },
];

const seedMusicTag = () => MusicTag.bulkCreate(musicTagData);

module.exports = seedMusicTag;
