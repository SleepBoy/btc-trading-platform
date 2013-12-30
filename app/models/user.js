/**
 * Created by jiangjustin on 13-12-29.
 */
var moment = require('moment');

module.exports = function (orm, db) {
    var User = db.define('user', {
        id          : { type: 'text', size: 64, required: true },
        displayName : { type: 'text', required: false },

        familyName  : { type: 'text', required: false },
        givenName   : { type: 'text', required: false },
        middleName  : { type: 'text', required: false }
    },
    {
        timestamp   : true,
        cache       : false,
        validations : {
            displayName : [
                orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
                orm.enforce.ranges.length(undefined, 64, "cannot be longer than 64 letters")
            ],
            familyName  : [
                orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
                orm.enforce.ranges.length(undefined, 64, "cannot be longer than 64 letters")
            ],
            givenName   : [
                orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
                orm.enforce.ranges.length(undefined, 64, "cannot be longer than 64 letters")
            ],
            middleName  : [
                orm.enforce.ranges.length(1, undefined, "must be atleast 1 letter long"),
                orm.enforce.ranges.length(undefined, 64, "cannot be longer than 64 letters")
            ]
        },
        methods     : {
            serialize   : function () {
                var emails;
                var photos;

                if (this.emails) {
                    emails = this.emails.map(function (c) { return c.serialize(); });
                } else {
                    emails = [];
                }

                if (this.photos) {
                    photos = this.photos.map(function (c) { return c.serialize(); });
                } else {
                    photos = [];
                }

                return {
                    id          : this.id,
                    displayName : this.displayName,
                    familyName  : this.familyName,
                    givenName   : this.givenName,
                    middleName  : this.middleName,
                    emails      : emails,
                    photos      : photos
                };
            }
        }
    });
};
