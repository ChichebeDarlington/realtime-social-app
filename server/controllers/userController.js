import User from "../models/User";
import { hashPassword, comparePassword } from "../bcrypt/bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Name is required" });
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).json({ msg: "Email is existed in the database" });
  }

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ msg: "Password is required" });
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });
  // .populate(" name ")
  // console.log(req.body);
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "170d",
  });
  try {
    await user.save();
    // console.log(user);
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ err: "Try again, something gone wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(300).json({ err: "Email field is empty" });
  }

  if (!password) {
    return res.status(300).json({ err: "Password field is empty" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ err: "No user with such an email" });
  }

  const verifyPassword = await comparePassword(password, user.password);
  if (!verifyPassword) {
    return res.status(400).json({ err: "Wrong password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "170d",
  });

  try {
    // console.log(user, token);
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ err: "Check if credentials are correct" });
  }
};

export const currentUser = async (req, res) => {
  // console.log(req.auth)
  try {
    const user = await User.findById(req.auth._id);
    // console.log(user);
    return res.json({ okay: true });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
