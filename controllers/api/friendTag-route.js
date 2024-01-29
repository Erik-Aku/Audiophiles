const router = require("express").Router();
const { User, Music, FriendTag, MusicTag } = require("../../models/index.js");
//path :  /friendTag

// post route on friendTag when you click on following an user
// user_id from currnet session
// friend_id from html element
router.post("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Please log in first!"); // 401 = Unauthorized error
      console.log("the user is not logged in");
      return;
    }
    req.body = {
      user_id: req.session.user_id,
      friend_id: req.body.friend_id,
    };
    const newFriendTag = await FriendTag.create(req.body);
    res.status(200).json(newFriendTag);
    console.log("successfully added one friend tag!");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete route when you click to unfollow an user
router.delete("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Please log in first!"); // 401 = Unauthorized error
      console.log("the user is not logged in");
      return;
    }
    const deleteFriendTag = await FriendTag.destroy({
      where: {
        user_id: req.session.user_id, // user_id from current session
        friend_id: req.body.friend_id, // from html element
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
