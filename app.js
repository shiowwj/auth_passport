const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose');
const keys = require('./config/key');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//set up view engine 
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60,
    keys:[`${keys.session.cookieKey}`],
}));

//init passport 
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoose
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('Connected to mongodb');
})

//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req,res)=>{
    res.render('home')
})

app.listen(3000, ()=>{
    console.log('App is listening on port 3000');
})
