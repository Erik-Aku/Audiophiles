const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User} = require("../models")


// renders the home.handlebars page
router.get('/', (req, res) => {
  res.render('home', {logged_in: req.session.logged_in});
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login', {logged_in: req.session.logged_in});
  });


  // Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [
      //   {
      //    model: User,
      //    attributes: ["first_name, last_name, email"] 
      //   }],
    });

    const user = userData.get({ plain: true });
    console.log(userData);

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;