const router = require("express").Router();

const sequelize = require("../../config/connection");
const { User, Music, FriendTag, MusicTag } = require("../../models");

// get all user and their music
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

// get one user by id and his/her music
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
// in progress
router.get("/friendlist/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Music }, { model: FriendTag }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT b.music_list CONCAT(b.first_name, " ", b.last_name) AS friend_name FROM user a JOIN friend_tag ON a.id = friend_tag.user_id RIGHT JOIN user b on a.id = b.id)'
            ),
            "Friend_musiclist",
          ],
        ],
      },
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

// add one user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(userData);
    console.log("Successfully added one user!");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete one user by its id
router.delete("/:id", async (req, res) => {
  try {
    const deleteOneUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({
        message: "No category found with that id",
      });
      console.log("successfully delete one user!")
      res.status(200).json(deleteOneUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
