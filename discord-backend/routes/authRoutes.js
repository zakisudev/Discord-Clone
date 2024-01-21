const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth/authControllers');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

// @route   POST /register
// @desc    Register user
// @access  Public
router.post('/register', validator.body(registerSchema), registerUser);

// @route   POST /login
// @desc    Login user
// @access  Public
router.post('/login', validator.body(loginSchema), loginUser);

// @route   POST /logout
// @desc    Logout user
// @access  Private
router.post('/logout', verifyToken, logoutUser);

module.exports = router;
