/**
 * Created by jiangjustin on 13-12-29.
 */
module.exports = function (orm, db) {
    var Email = db.define('email', {
            value: { type: 'text', size: 512, required: true },
            type: { type: "enum", required: true, values: [ "Home", "Work", "Other" ] },
        },
        {
            id: 'value',
            timestamp: true,
            cache: false,

            validations: {
                value: orm.enforce.ranges.length(1, 512)
            },
            methods: {
                serialize: function () {
                    return {
                        value: this.value,
                        type: this.type
                    }
                }
            }
        });

    Email.hasOne('user', db.models.user, { required: true, reverse: 'emails', autoFetch: true });
};
