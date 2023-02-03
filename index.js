const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv'). config()

const app = express();
const PORT = process.env.PORT
const DB= process.env.DB_URI


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//MongoDB connect

mongoose.connect(
  `${DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB has connected successfully");
  }
);

//Student Model and Schema

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  firstName: String,
  middleName: String,
  lastName: String,
  class: String,
  division: String,
  rollNumber: String,
  address1: String,
  address2: String,
  landmark: String,
  city: String,
  pincode: String,
});

const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Hi");
});

//Backend Routers

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Incorrect Password" });
      }
    } else {
      res.send({ message: "User Not Found" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already Registered" });
    } else {
      const user = new User({
        email: email,
        name: name,
        password: password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Registered Successfully" });
        }
      });
    }
  });
});

app.post("/addStudent", (req, res) => {
  // Check the student's email and password
  const {
    firstName,
    middleName,
    lastName,
    Class,
    division,
    rollNumber,
    address1,
    address2,
    landmark,
    city,
    pincode,
  } = req.body;
  const user = new User({
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    Class: Class,
    division: division,
    rollNumber: rollNumber,
    address1: address1,
    address2: address2,
    landmark: landmark,
    city: city,
    pincode: pincode,
  });
  user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Student details Registered Successfully!");
    }
  });
});

app.listen(`${PORT}`, () => {
  console.log(`The app has started on port ${PORT}` );
});
