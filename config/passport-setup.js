const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./key');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
})

passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exist in db

        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //User already exist in DB
                console.log('User exist!', currentUser);
                done(null, currentUser);
            } else {
                //if not create user in DB
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                }).save().then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                });
            }
        })
    })
)


