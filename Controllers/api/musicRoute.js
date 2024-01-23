const router = require("express").Router();
const { User, Music, FriendTag, MusicTag } = require("../../Models/index.js");

//get all music s
router.get("/", async (res, req) => {
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
router.get("/:id", async (res, req) => {
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

router.post("/", async (res, req) => {
  try {
    const addOneMusic = await Music.create({
      artist_name: req.body.artist_name,
      album_name: req.body.album_name,
      album_image: req.body.album_image,
    });
    res.status(200).json(addOneMusic);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedMusicData = await Music.update(
      {
        artist_name: req.body.category_name,
        album_name: req.body.album_name,
        album_image: req.body.album_image,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedMusicData) {
      res.status(404).json("No category with that id is found");
      return;
    }
    res.status(200).json(updatedMusicData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (res, req) => {
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
