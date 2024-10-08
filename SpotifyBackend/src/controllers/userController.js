import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
    
const addUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = {
      email,
      password,
    };

    const user = userModel(userData);
    await user.save();

    res.json({ success: true, message: "Successfully added" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};
const listUser = async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.json({ success: true, users: allUsers });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User Removed" });
  } catch (error) {
    res.json({ success: false });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
  
      if (user.password !== password) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  
  export { addUser, listUser, removeUser, loginUser };
