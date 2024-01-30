const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index.js');
const helpers = require('./utils/helpers');
// const apiController = require('../public/js/apiController.js');
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;


// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Move secret to env file when ready 
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3600000,  
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public' ));


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(routes);

sequelize.sync({ alter: true, force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now Listening on ${PORT}`));
});
