const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
  }
});

UserSchema.pre('save', function(next) {
  // https://github.com/kelektiv/node.bcrypt.js#usage
  let user = this;
  // Fill this middleware in with the Proper password encrypting, bcrypt.hash()
  bcrypt.hash(user.password, 11, (err, hash) => {
    // if there is an error here you'll need to handle it by calling next(err);
    if (err) return next(err);
    user.password = hash;
    // Once the password is encrypted, call next() so that your userController and create a user
    next();
  });
});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
  // https://github.com/kelektiv/node.bcrypt.js#usage
  let user = this;
  // Fill this method in with the Proper password comparing, bcrypt.compare()
  bcrypt.compare(plainTextPW, user.password, (err, isMatch) => {
    // Your controller will be responsible for sending the information here for password comparison
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
  // Once you have the user, you'll need to pass the encrypted pw and the plaintext pw to the compare function
};

// if you're really stuck with this at this point, you can reference this document.
// https://github.com/LambdaSchool/Auth-JWT/blob/master/models/index.js This is what we're going for here.

module.exports = mongoose.model('User', UserSchema);
