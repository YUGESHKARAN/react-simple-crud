const express = require("express");
const router = express.Router();
const User = require("../models/userRegisterSchema");

const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/register.controller");

//Register route
router.get("/", getUsers);

router.get("/:email", getUser);

router.post("/", addUser);

router.put("/:email", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
