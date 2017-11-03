const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    id: SchemaTypes.Long,
    accessToken: String,
    expiresAt: SchemaTypes.Long,
    createdPolls: [],
    nickname: String,

});
const User = mongoose.model('user', UserSchema);
module.exports = User;
// User.create({category: 1, title: 'Minion'}, function(err, doc) {
//     // At this point the jobs collection is created.
// });
