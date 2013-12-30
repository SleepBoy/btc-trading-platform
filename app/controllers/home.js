var settings = require('../../config/settings');

module.exports = function (req, res, next) {
    res.render('home', { user: req.user ? req.user.serialize() : req.user });
};
