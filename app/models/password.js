/**
 * Created by jiangjustin on 13-12-29.
 */
var crypto = require('crypto');

module.exports = function (orm, db) {
    var Password = db.define('password', {
        value: { type: 'text', required: true },
    },
    {
        timestamp   : true,
        cache       : false,
        validations : {
            value       : orm.enforce.ranges.length(1, 64)
        },
        methods     : {
            serialize   : function () {
                return {
                }
            },

            check       : function (p) {
                var hasher = crypto.createHash("md5");
                hasher.update(p);
                var msg = hasher.digest('hex');

                return (this.value == msg);
            }
        }
    });

    Password.hasOne('user', db.models.user, { required: true, reverse: 'password', autoFetch: true });
};
