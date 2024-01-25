const router = require("express").Router();

const sequelize = require("../../config/connection.js");
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");

// get all user and their music
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        { model: Music },
        {
          model: FriendTag,
          attributes: ["id", "friend_id", "user_id"],
          as: "UserHasTag",
        },
        {
          model: User,
          as: "UserToUser",
          include: [{ model: Music }],
        },
      ],
    });
    console.log(userData);
    if (!userData) {
      res.status(404).json("No user is found!");
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
      include: [
        { model: Music },
        {
          model: FriendTag,
          attributes: ["id", "friend_id", "user_id"],
          as: "UserHasTag",
        },
        {
          model: User,
          as: "UserToUser",
          include: [{ model: Music }],
        },
      ],
    });
    if (!userData) {
      res.status(404).json("No user is found!");
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

/*
router.get("/friendlist/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Music }, { model: FriendTag }],
    });

    if (!userData) {
      res.status(404).json("No user is found!");
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
*/

// update an user by its id : when you want to change the profile data of an user
router.put("/:id", async (req, res) => {
  try {
    /* example: 
    req.body = {
      first_name: req.body.first_name,
      last_name : req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    } */
    const newUserData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!newUserData) {
      res.status(404).json("No user with this id is found!");
      console.log("No user with this id is found!");
      return;
    }
    res.status(200).json(newUserData);
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
        message: "No user found with that id",
      });
      console.log("successfully delete one user!");
      res.status(200).json(deleteOneUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
