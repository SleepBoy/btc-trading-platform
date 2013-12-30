var path = require('path');
var express = require('express');
var passport = require('passport');
var flash = require('connect-flash');
var settings = require('./settings');
var models = require('../app/models/');

module.exports = function (app) {
    app.configure(function () {
        app.use(express.static(path.join(settings.path, 'public')));
        app.use(express.logger({ format: 'dev' }));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({ secret: 'keyboard cat' }));
        app.use(express.methodOverride());

        app.use(flash());

        app.use(passport.initialize());
        app.use(passport.session());

        app.engine('.html', require('ejs').__express);
        app.set('views', path.join(settings.path, 'views'));
        app.set('view engine', 'html');

        app.use(function (req, res, next) {
            models(function (err, db) {
                if (err) return next(err);

                req.models = db.models;
                req.db = db;
                app.models = db.models;
                app.db = db;

                return next();
            });
        }),
            app.use(app.router);
    });
};
