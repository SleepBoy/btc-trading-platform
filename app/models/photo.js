/**
 * Created by jiangjustin on 13-12-29.
 */
module.exports = function (orm, db) {
    var Photo = db.define('photo', {
        value       : { type: 'text', size: 1024, required: true },
        },
    {
        timestamp   : true,
        cache       : false,
        validations : {
            value       : orm.enforce.ranges.length(1, 1024)
        },
        methods     : {
            serialize   : function () {
                return {
                    value       : this.value
                }
            }
        }
    });

    Photo.hasOne('user', db.models.user, { required: true, reverse: 'photos', autoFetch: true });
};
