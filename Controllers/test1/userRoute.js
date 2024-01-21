const router = require("express").Router();

const sequelize = require("../../config/connection");
const { User, Music, FriendTag, MusicTag } = require("../../models");

// get all user
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Music }],
    });
    if (!userData) {
      res.status(404).json("No product is found!");
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// get one user by id
router.get("/:id", async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: Music }],
      });
      if (!userData) {
        res.status(404).json("No product is found!");
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

// find one user by id and get the friend list of this user  
//modi
router.get("/friendlist/:id", async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: Music }],
        attributes:{
          include:[
             [sequelize.literal(
              '(SELECT b.music_list CONCAT(b.first_name, " ", b.last_name) AS friend_name FROM user a JOIN friend  RIGHT JOIN user b on user.id = user.id)'
             ),]

          ]
        }
      });
      if (!userData) {
        res.status(404).json("No product is found!");
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  });

module.exports = router;

