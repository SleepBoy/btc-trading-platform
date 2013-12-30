var models = require('../app/models/');

models(function (err, db) {
    if (err) throw err;

    db.drop(function (err) {
        if (err) throw err;

        db.sync(function (err) {
            if (err) throw err;

            db.models.user.create({
                displayName: "Justin Jiang", id: "7ce2b640-7103-11e3-a781-b34e21e0444d", createAt: new Date()
            }, function (err, user) {
                if (err) throw err;

                db.models.email.create({
                    value: "jiangjiang@fengzexin.com", type: "Work", user_id: user.id
                }, function (err, email) {
                    if (err) {
                        throw err;
                    }
                })

                db.models.password.create({
                    value: "63e448eb26acf03d19b65e7bf4d1a038", user_id: user.id
                }, function (err, password) {
                    if (err) {
                        throw err;
                    }
                })

                db.close()
                console.log("Done!");
            });
        });

    });

});
