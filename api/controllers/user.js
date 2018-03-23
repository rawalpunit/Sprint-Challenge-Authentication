const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mysecret } = require('../../config');

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
  user.findOne( {username}, (err, user) => {
    if (err) {
      res.status(500).json( {error: 'Invalid Username'} );
      return;
    }
    if (user === null) {
      res.status(422).json( {error: "Couldn't find user in DB"} );
      return;
    }
    user.checkPassword(password, (noMatch, hashMatch) => {
      if (noMatch) {
        res.status(422).json( {error: 'passwords dont match'} );
        return;
      } else {
        const token = jwt.sign(userObject, secret, { expiresIn: '1h' });
        res.json( {token} );
      }
    });
  });
};

// const getAllJokes = (req, res) =>{}




module.exports = {
  createUser,
  login,
  
};
