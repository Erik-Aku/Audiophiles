const router = require("express").Router();
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");
// path: /musicTag

// when a user click save an music to musiclist
// a music will be insert into music table
// and a musicTag have user_id and music_id will be insert into music table

// when you want to delete a music from your music list
router.delete("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Please log in first!"); // 401 = Unauthorized error
      console.log("the user is not logged in");
      return;
    }
    const deleteFromMusiclist = await MusicTag.destroy({
      where: {
        user_id: req.session.user_id,
        music_id: req.body.music_id,
      },
    });
    if (!deleteFromMusiclist) {
      res.status(404).json(deleteFromMusiclist);
      console.log("No musicTag with this user_id and music_id is found!");
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// database, delete one by its id.
router.delete("/db/:id", async (req, res) => {
  try {
    const deleteOneMusicTagbyID = await MusicTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteFromMusiclist) {
      res.status(404).json(deleteOneMusicTagbyID);
      console.log("No musicTag with this id is found!");
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
