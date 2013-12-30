var settings = require('../../config/settings');

module.exports = function (req, res, next) {
    if (req.user && req.user.serialize) {
        console.log(req.user.serialize());
    }

    res.render('home', { user: req.user ? req.user.serialize() : req.user });
};
