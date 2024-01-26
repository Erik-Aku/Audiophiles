const router = require("express").Router();

const sequelize = require("../../config/connection.js");
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");
//path : /users

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
    if (!req.session.logged_in) {
      res.status(401).json("Please log in first!"); // 401 = Unauthorized error
      console.log("the user is not logged in");
      return;
    }
    const userData = await User.findByPk(req.session.user_id, {
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

// add one user

router.post("/", async (req, res) => {
  try {
    /*
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
router.delete("/db/:id", async (req, res) => {
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

// Erik's routes----------------------------------------------------

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
      console.log("Successfully added one user!");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
