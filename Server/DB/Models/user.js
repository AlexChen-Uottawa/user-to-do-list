const mongoose = require('../conn');

let userSchema = require('../schemas/user');
module.exports = mongoose.model('Users',userSchema);