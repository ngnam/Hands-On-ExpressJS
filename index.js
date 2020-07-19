const express = require('express');
const path = require('path');
const logger = require('./logger');
const app = express();
const exphbs = require('express-handlebars');

const members = require('./routers/data/Members');

// init Middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Router
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Members App',
        members: members
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Members API Router 
app.use('/api/members', require('./routers/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});