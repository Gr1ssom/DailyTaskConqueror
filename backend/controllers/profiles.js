import Profile from '../models/Profile.js';

export const createProfile = async (req, res, next) => {
  try {
    const user = new Profile(req.body);
    const newUser = await user.save().select('name user');
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllProfiles = async (req, res, next) => {
  try {
    const users = await Profile.find().select('name email');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await Profile.findById(req.user.id).select('name email');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await Profile.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
      },
    ).select('name email');
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const getProfileInfo = async (req, res, next) => {
  try {
    const data = await Profile.findById(req.user.id)
      .select('name email tasks');
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};