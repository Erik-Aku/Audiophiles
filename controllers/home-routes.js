const router = require('express').Router();
const withAuth = require('../utils/auth');


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



module.exports = router;