
const db = require('../models');

exports.addFriend = async (req, res) => {
  try {
    const { userId } = req.session; // Assuming you have user information in the session
    const { friendId } = req.params;

    const friendship = await db.Friendship.create({
      user1Id: userId,
      user2Id: friendId,
    });

    res.json({ message: 'Friend request sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const { userId } = req.session;
    const user = await db.User.findByPk(userId, { include: ['friends'] });

    res.json(user.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
