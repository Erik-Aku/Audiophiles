const router = require("express").Router();
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
          as: "UserHasFriendTag",
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
router.get("/currentUser", async (req, res) => {
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
          as: "UserHasFriendTag",
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
    
    //deconstruct object for better use
    //console.log("user data before deconstruct");
    //console.log(UserData1);

    let UserData1 = await userData.get({ plain: true });

    UserData1= {
      currentUser_id: userData.id,
      currentUser_name: `${userData.first_name} ${userData.last_name}`,
      currentUser_email: userData.email,
      currentUser_hasMusic: userData.music.map(
        (item) =>
          (item.music = {
            music_id: item.id,
            artist_name: item.artist_name,
            album_name: item.album_name,
            album_image: item.album_image,
          })
      ),
      currentUser_hasFriend: userData.UserToUser.map(
        (item) =>
          (item = {
            friends_id: item.id,
            name: `${item.first_name} ${item.last_name}`,
            email: item.email,
            music: item.music.map(
              (item) =>
                (item = {
                  music_id: item.id,
                  artist_name: item.artist_name,
                  album_name: item.album_name,
                  album_image: item.album_image,
                })
            ),
          })
      ),
    };
  
    //console.log("user data after deconstruct");
    //console.log(UserData1);
    res.status(200).json(UserData1);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//db: get one user by id
router.get("/db/:id", async (req, res) => {
  try {
    let userData = await User.findByPk(req.params.id, {
      include: [
        { model: Music },
        {
          model: FriendTag,
          attributes: ["id", "friend_id", "user_id"],
          as: "UserHasFriendTag",
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

    let UserData1 = await userData.get({ plain: true });

    UserData1= {
      currentUser_id: userData.id,
      currentUser_name: `${userData.first_name} ${userData.last_name}`,
      currentUser_email: userData.email,
      currentUser_hasMusic: userData.music.map(
        (item) =>
          (item.music = {
            music_id: item.id,
            artist_name: item.artist_name,
            album_name: item.album_name,
            album_image: item.album_image,
          })
      ),
      currentUser_hasFriend: userData.UserToUser.map(
        (item) =>
          (item = {
            friends_id: item.id,
            name: `${item.first_name} ${item.last_name}`,
            email: item.email,
            music: item.music.map(
              (item) =>
                (item = {
                  music_id: item.id,
                  artist_name: item.artist_name,
                  album_name: item.album_name,
                  album_image: item.album_image,
                })
            ),
          })
      ),
    };
 
    res.status(200).json(UserData1);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
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

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//db: update an user
router.put("/db/:id", async (req, res) => {
  try {
    /* example
    req.body = {
      first_name: req.body.first_name,
      last_name : req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    }  */
    const newUserData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(newUserData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//db: add a user
router.post("/db", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(userData);
    console.log("Successfully added one user!");
  } catch (err) {
    res.status(400).json(err);
  }
});

//db: delete one user by its id
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

module.exports = router;
