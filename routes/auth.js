const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("This email is envalid")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((result) => {
          if (!result) {
            throw new Error("Email Not Matched");
          }
          return true;
        });
      })
      .normalizeEmail(),
    body("password", "very bad password")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      // .custom((value, { req }) => {
      //   if (value === "test@t.com") {
      //     throw new Error("This email address is frobidden.");
      //   }
      //   return true;
      // }),
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a diffrent one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "please enter a password with only numbers and text and least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwrods have to match");
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
