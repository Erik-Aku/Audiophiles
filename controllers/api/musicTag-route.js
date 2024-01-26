const router = require("express").Router();
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");
// path: /musicTag

// when a user click save an music to musiclist
// a music will be insert into music table
// and a musicTag have user_id and music_id will be insert into music table

// Todo: create a route for when click save a music to music list
// this route is in musicRoute
/*  
router.post("/", async (res, req) => {
  if (!req.session.logged_in) {
    res.status(401).json("Please log in first!"); // 401 = Unauthorized error
    console.log("the user is not logged in");
    return;
  }
  req.body = {
    user_id: req.session.user_id,
  };
  const newMusicTag = await MusicTag.create(req.body);
});
*/

// when you want to delete a music from your music list
router.delete("/", async (res, req) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Please log in first!"); // 401 = Unauthorized error
      console.log("the user is not logged in");
      return;
    }
    const deleteFromMusiclist = await MusicTag.destroy({
      where: {
        user_id: req.session.user_id,
        music_id: req.body.music_body,
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
router.delete("/db/:id", async (res, req) => {
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
