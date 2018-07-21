const express = require('express');
const userRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require("passport");

userRouter.get('/signup', (req, res, next) => {

  res.render('userViews/signUpPage');

})

userRouter.post('/signup', (req, res, next) => {
  const userPassword = req.body.userPassword;
  const theUsername = req.body.theUsername;
  if (userPassword === "" || theUsername === "") {
    res.render('userViews/signUpPage', {
      errorMessage: 'Please fill in both a username and password in order to create an account.'
    })
    return;
  }
  User.findOne({
      'username': theUsername
    })
    .then((responseFRomDB) => {
      if (responseFRomDB !== null) {
        res.render('userViews/signUpPage', {
          errorMessage: `Sorry, the username ${theUsername} `
        })
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(userPassword, salt);
      User.create({
          username: theUsername,
          password: hashedPassword
        })
        .then((response) => {
          res.redirect('/');
        })
        .catch((err) => {
          next(err);
        })
    })
});


userRouter.get('/login', (req, res, next) => {
  res.render('userViews/loginPage', {
    message: req.flash("error")
  });
})

userRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

userRouter.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/login");
});


module.exports = userRouter;