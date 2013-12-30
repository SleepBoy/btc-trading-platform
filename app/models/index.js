var orm         = require('orm');
var modts       = require('orm-timestamps');
var transaction = require("orm-transaction");
var settings    = require('../../config/settings');

var connection = null;

function setup(db, cb) {
    require('./user')(orm, db);
    require('./email')(orm, db);
    require('./photo')(orm, db);
    require('./password')(orm, db);

	return cb(null, db);
}

module.exports = function (cb) {
	if (connection) return cb(null, connection);

	orm.connect(settings.database, function (err, db) {
		if (err) return cb(err);

		db.settings.set('instance.returnAllErrors', true);
        db.use(transaction);
        db.use(modts, {
            createdProperty: 'created_at',
            modifiedProperty: 'modified_at',
            dbtype: { type: 'date', time: true },
            now: function() { return new Date(); },
            persist: true
        });
        setup(db, cb);
	});
};
