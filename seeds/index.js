const seedUsers = require("./seed-user");
const seedMusic = require("./seed-music");
const seedMusicTag = require("./seed-musicTag");
const seedFriendTag = require("./seed-friendTag");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true }); // force:true = drop all existing tables if exists
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- Users SEEDED -----\n");

  await seedMusic();
  console.log("\n----- Music SEEDED -----\n");

  await seedMusicTag();
  console.log("\n----- Music TAGS SEEDED -----\n");

  await seedFriendTag();
  console.log("\n----- Friend TAGS SEEDED -----\n");

  process.exit(0);
};

seedAll();
