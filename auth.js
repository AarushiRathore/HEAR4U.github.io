const router = require("express").Router();
const User = require("../model/User");

router.post("/register", async (req, res) => {
  const user = new User({
    name : req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  console.log("Entering Try Catch");
  try {
    console.log(user.name +" - " + user.email);
      const savedUser = await user.save();
      console.log("saved user = " + savedUser);
      res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.post("/login", (req, res) => {
  console.log("Console Logged In");
  res.send("Logged In Successful");
});

module.exports = router;
