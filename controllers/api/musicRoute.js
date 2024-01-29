const router = require("express").Router();
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");
//path /music

// Insert a music into music table for when click save a music to your music list
router.post("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Please log in first!"); // 401 = Unauthorized error
      console.log("the user is not logged in");
      return;
    }

    const addOneMusic = await Music.create({
      artist_name: req.body.artist_name,
      album_name: req.body.album_name,
      album_image: req.body.album_image,
      song_name: req.body.song_name,
      music_link: req.body.music_link,
    });
  //  res.status(200).json(addOneMusic);

    const addOneMusicTag = await MusicTag.create({
      user_id: req.session.user_id,
      music_id: addOneMusic.id,
    });
    res.status(200).json(addOneMusicTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all music s
router.get("/db", async (req, res) => {
  try {
    const musicData = Music.findAll();
    if (!musicData) {
      res.status(404).json("No music data is found!");
      return;
    }
    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one by its id
router.get("/db/:id", async (req, res) => {
  try {
    const musicData = Music.findByPk(req.param.id);
    if (!musicData) {
      res.status(404).json("No music data is found!");
      return;
    }
    res.status(200).json(musicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update the information of a music stored in the database
router.put("/db/:id", async (req, res) => {
  try {
    const updatedMusicData = await Music.update(
      {
        artist_name: req.body.category_name,
        album_name: req.body.album_name,
        album_image: req.body.album_image,
        song_name: req.body.song_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedMusicData) {
      res.status(404).json("No Music with that id is found");
      return;
    }
    res.status(200).json(updatedMusicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//db: delete an music and delete all associated music tags
router.delete("/db/:id", async (req, res) => {
  try {
    const deleteOneMusic = await Music.destroy({
      where: {
        id: req.param.id,
      },
    });
    res.status(200).json(deleteOneMusic);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
