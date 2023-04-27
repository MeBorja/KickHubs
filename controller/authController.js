const User = require("../models/User");
const jwt = require('jsonwebtoken');
const Score = require('../models/Score')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', username: '' };

  // duplicate email error
if (err.message === 'incorrect email') {
  errors.email = 'That email is not registered'
}
if (err.message === 'incorrect password') {
  errors.password = 'That password is incorrect'
}


  if (err.code === 11000) {
    if(err.message.includes('username_1 dup key:')) {
      errors.username = 'that user name is already taken'
    }
    if (err.message.includes('email_1 dup key')) {
      errors.email = 'that email is already registered';
    }

    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({ errors });
  }

}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
    
}



module.exports.score_post = async (req, res) => {
  const { score, username } = req.body;
  try {
    const scorePlayer = await Score.create({score, username})
    res.status(201).json(scorePlayer)
  } catch (error) {
    console.log(error);
  }
  
}