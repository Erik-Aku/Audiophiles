const router = require('express').Router();


// renders the home.handlebars page
router.get('/', (req, res) => {
  res.render('home');
});


router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });



module.exports = router;