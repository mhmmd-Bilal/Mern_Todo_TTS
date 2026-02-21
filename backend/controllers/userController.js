import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const userExists = await Users.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  const user = await Users.create({
    name,
    email,
    password: encryptedPassword,
  });

  if (user) {
    return res.status(201).json(user);
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  const user = await Users.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "login success", data: {
      name :user.name,
      email :user.email,
      _id :user._id
    } });
  } else {
    res.status(404).json({ message: "no accounts matched" });
  }
});

const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({message : 'User Loggout Success'})
};

export { registerUser, loginUser, logoutUser };
