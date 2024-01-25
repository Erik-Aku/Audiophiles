const router = require("express").Router();
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");
//path /


// Todo:
// post route on friendTag when you click on following an user
router.post("/", async (req, res) => {
  req.body = {
    user_id: req.body.user_id,
    friend_id: req.body.friend_id,
  };
  try {
    const newFriendTag = await FriendTag.create(req.body);
    res.status(200).json(newFriendTag);
    console.log("successfully added one friend tag!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Todo:
// delete route when you click to unfollow an user
// delete an friend tag of the logged in user, where the user_id and friend_id from comes from html element
// the user_id must match the id of current user.
router.delete("/", async (req, res) => {
  try {
    const deleteFriendTag = await FriendTag.destroy({
      where: {
        user_id: req.body.user_id,   // logged in user_id
        friend_id: req.body.friend_id,  // from html element
      },
    });
    if (!deleteFriendTag) {
      res
        .status(404)
        .json("No friendtag with matching user_id and friend_id is found!");
      console.log("No friendtag with matching user_id and friend_id is found!");
      return;
    }
    res.status(200).json(deleteFriendTag);
    console.log("Successfully deleted one friendTag");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
