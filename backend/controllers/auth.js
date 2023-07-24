export const register = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Name, Email & password are required'
    });
  }

  try {
    const existingUser = await Profile.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already in use. Please use a different email.'
      });
    }

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
    console.error("Error during user registration:", err);
    return res.status(500).json({
      message: 'Internal Server Error. Please try again later.'
    });
  }
};
