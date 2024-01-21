const router = require("express").Router();

const { User, Music, FriendTag, MusicTag } = require("../../models");

// get all user
router.get("./", async (req, res) => {
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
router.get("./", async (req, res) => {
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

// get only the friend list of a user
//modi
router.get("./", async (req, res) => {
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

module.exports = router;

