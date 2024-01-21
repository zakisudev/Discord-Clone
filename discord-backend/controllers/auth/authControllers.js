const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../../utils/generateToken');

// @route   POST /register
// @desc    Register user
// @access  Public
const registerUser = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: 'Please provide user details', status: false });
  }

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide all fields', status: false });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        message: 'Email already exists, please login',
        status: false,
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // create token
    const token = generateToken(user._id, user);

    res.status(201).json({
      userInfo: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      },
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};

// @route   POST /login
// @desc    Login user
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User does not exist', status: false });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = generateToken(user);

      return res.status(200).json({
        userInfo: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          token,
        },
        status: true,
      });
    } else {
      return res
        .status(401)
        .json({ message: 'Invalid email or password', status: false });
    }
  } catch (error) {
    res.status(500).json({ error, status: false });
  }
};

// @route   POST /logout
// @desc    Logout user
// @access  Private
const logoutUser = async (req, res) => {
  console.log(req.user);
  try {
    res.status(200).json({ message: 'Logout successful', status: true });
  } catch (error) {
    res.status(500).json({ error, status: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
