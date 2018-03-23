const User = require('../models/userModels');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;
  // create user takes in the username and password and saves a user.
  const user = new User( {username, password} );
  // our pre save hook should kick in here saving this user to the DB with an encrypted password.
  user.save( (err, user) => {
    if (err) return res.send(err);
    res.json( {
      success: 'User saved!', user
    });
  });
};

const login = (req, res) => {
  const {username, password} = req.body;
}

module.exports = {
  createUser,
  login,
  getAllJokes
};
