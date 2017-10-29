const mongoose = require('mongoose');


let UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    conf_password: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('users', UserSchema);
