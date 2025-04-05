const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  verifyingUser,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:userId", getUserProfile);
router.put("/useredit/:userId", updateUserProfile);
// router.get("/verify", verifyingUser);

module.exports = router;
