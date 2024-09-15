const User = require("../models/userRegisterSchema");

const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (err) {
    res.send("Error" + err);
  }
};

const getUser = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.params.email });
    if (!data) {
      return res.status(404).json({ message: "User not foound" });
    }
    res.json(data);
  } catch (err) {
    res.send("Error" + err);
  }
};

const addUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already exists" });
    }

    user = new User({
      username,
      password,
      email,
      role,
    });

    data = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not exists" });
    }

    Object.assign(user, req.body);

    data = await user.save();
    res.status(201).json({ message: "User Upadeted successfully", user: data });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User Not Exist" });
    }
    res.json({ message: "User deleted successfully", user: user });
  } catch (err) {
    res.send("error" + err);
  }
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
