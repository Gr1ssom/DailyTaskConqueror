import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Profile from '../models/Profile.js';


export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(
      err({
        message: 'Email and password are required',
        statusCode: 400,
      }),
    );
  }

  try {
    const profile = await Profile.findOne({ email: req.body.email }).select(
      'name email password',
    );
    if (!profile) {
      return next(
        err({ status: 404, message: 'User not found with the email' }),
      );
    }
    const isPasswordCorrect = await bcryptjs.compare(
      req.body.password,
      profile.password,
    );
    if (!isPasswordCorrect) {
      return next(
        err({ status: 400, message: 'Password is incorrect' }),
      );
    }
    const payload = {
      id: profile._id,
      name: profile.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
      })
      .status(200)
      .json({ name: profile.name, email: profile.email, message: 'login success' });
  } catch (err) {
    return next(err);
  }
};

export const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(
      err({
        message: 'Name, Email & password are required',
        statusCode: 400,
      }),
    );
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new Profile({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json('New User Created');
  } catch (err) {
    return next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('access_token');
  res.status(200).json({ message: 'logout success' });
};

export const isLoggedIn = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
};