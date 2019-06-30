const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./key');

passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function 
        console.log('PASSPORT CALL BACK FIRED HERE');
        console.log(profile);
        console.log('////////')
        console.log({ accessToken, refreshToken })
    })
)

