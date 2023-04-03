const bcrypt = require("bcrypt");
const authModel = require("../models/authModel");
require("dotenv").config();


//add a new user
const register = async (req, res) => {
  try {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).send("All fields are required");
  }
  //generate hashed password
  const hashedPassword = bcrypt.hashSync(password, 15);
    // console.log("checking existing user");
    const checkExistingUser = await authModel.checkExistingUser(email);
    const data = {
      name: name,
      email: email,
      password: hashedPassword,
      created_at: new Date(),
    };

    if (checkExistingUser.length > 0) {
      console.log("user exists");
      return res.status(400).send("User already exists");
    }
    const registerUser = await authModel.register(data);
      return res.status(200).send("User registered successfully");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

//login a user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkExistingUser = await authModel.checkExistingUser(email);
    if (checkExistingUser.length == 0) {
      return res.status(400).send("User does not exist");
    }
    const user = checkExistingUser[0];
    console.log(user);
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).send("Invalid password");
    }
    return res.send("User logged in successfully");
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error");
  }
};

const insertTime = async (req, res) => {
  try {
    const { email, time } = req.body;
    if(!email || !time){
      return res.status(400).send("All fields are required");
    }
    console.log(time, email)
    const checkExistingUser = await authModel.checkExistingUser(email);
    if (checkExistingUser.length == 0) {
      return res.status(400).send("User does not exist");
    }
    const data = {
      email: email,
      time: JSON.stringify(time),
    };

    const insertTime = await authModel.insertTime(data);
      return res.send("Time inserted successfully");
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};





module.exports = {
  register,
  login,
  insertTime

};
