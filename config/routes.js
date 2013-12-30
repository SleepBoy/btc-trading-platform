var passport = require('passport');
var controllers = require('../app/controllers');

module.exports = function (app) {

    app.get('/login', controllers.user.login_page);
    app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

    app.get('/signup', controllers.user.signup_page);
    app.post('/signup', controllers.user.signup);

    app.get('/', controllers.home);

    /**
     app.get( '/messages'                    , controllers.messages.list);
     app.post('/messages'                    , controllers.messages.create);
     app.get( '/message/:id'                 , controllers.messages.get);
     app.post('/message/:messageId/comments' , controllers.comments.create);
     **/

};
