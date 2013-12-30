/**
 * Created by jiangjustin on 13-12-29.
 */
var crypto = require('crypto');
var passport = require('passport');
var passport_local = require('passport-local');

var LocalStrategy = passport_local.Strategy;

module.exports = function (app) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        app.models.user.get(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        {passReqToCallback: true},
        function (request, username, password, done) {
            request.models.email.find({ value: username }).one(function (err, email) {
                if (err) {
                    return done(err);
                }

                if (!email) {
                    return done(null, false, {message: 'find email error, username: ' + username});
                }

                email.getUser(function (err, user) {
                    if (!user) {
                        return done(null, false, {message: 'find owner from email err, email: ' + email.value});
                    }

                    user.getPassword(function (err, passwords) {
                        if (passwords && passwords.length > 0) {
                            if (passwords[0].check(password)) {
                                return done(null, user);
                            } else {
                                return done(null, false, {message: 'incorrect password'});
                            }
                        } else {
                            var hasher = crypto.createHash("md5");
                            hasher.update(password);
                            var msg = hasher.digest('hex');

                            console.log('password\'s md5: \"' + msg + '\"');
                            return done(null, false, {message: 'incorrect password'});
                        }
                    });
                });
            });
        }
    ));
};