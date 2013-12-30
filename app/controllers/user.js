/**
 * Created by jiangjustin on 13-12-30.
 */
var crypto = require('crypto');
var uuid = require('node-uuid');
var passport = require('passport');
var passport_local = require('passport-local');

module.exports = {
    signup_page: function (req, res, next) {
        res.render('user/signup', { message: req.flash('error') });
    },
    signup: function (req, res, next) {
        var username = req.param('username');
        var password = req.param('password');
        var display_name = req.param('display_name');

        if (!username || username.length < 5) {
            return res.render('user/signup', { message: 'username is too short' });
        }

        if (!password || password.length < 6) {
            return res.render('user/signup', { message: 'password is too short' });
        }

        if (!display_name || display_name.length < 3) {
            return res.render('user/signup', { message: 'display name is too short' });
        }

        var hasher = crypto.createHash("md5");
        hasher.update(password);
        var md5 = hasher.digest('hex');

        if (!md5 || md5.length != 32) {
            return res.render('user/signup', { message: 'md5 error' });
        }

        req.db.transaction(function (err, t) {
            if (err) return next(err);

            req.models.email.find({value: username}, function (err, emails) {
                if (err) return next(err);

                if (emails && emails.length > 0) {
                    t.rollback(function (err) {
                        if (err) return next(err);

                        return res.render('user/signup', { message: 'email is exist' });
                    });
                } else {
                    req.models.user.create({
                        displayName: display_name, id: uuid.v1()
                    }, function (err, user) {
                        if (err) throw err;

                        req.models.email.create({
                            value: username, type: "Other", user_id: user.id
                        }, function (err, email) {
                            if (err) {
                                throw err;
                            }
                        })

                        req.models.password.create({
                            value: md5, user_id: user.id
                        }, function (err, password) {
                            if (err) {
                                throw err;
                            }
                        })

                        req.models.user.get(user.id, function (err, user) {
                            t.commit(function (err) {
                                if (err) return next(err);

                                return res.render('user/signup_succ', {user: user.serialize()});
                            });
                        })
                    });
                }
            });
        });
    },

    login_page: function (req, res, next) {
        res.render('user/login', { message: req.flash('error') });
    }
};
