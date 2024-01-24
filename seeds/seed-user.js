const { User } = require("../models/index.js");

const userData = [
  {
    first_name: "FN1",
    last_name: "LN1",
    email: "111@gmail.com",
    password: "1111aaaa",
  },
  {
    first_name: "FN2",
    last_name: "LN2",
    email: "222@gmail.com",
    password: "2222bbbb",
  },
  {
    first_name: "FN3",
    last_name: "LN3",
    email: "333@gmail.com",
    password: "3333bbbb",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
