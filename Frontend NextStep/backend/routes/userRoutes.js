const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getSavedItemsDetailed,
  updateUserProfile,
  toggleSave,
  getRecommendations,
  forgotPassword,
  resetPasswordWithOTP,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:userId", getUserProfile);
router.put("/useredit/:userId", updateUserProfile);
router.get("/getSavedItem/:userId", getSavedItemsDetailed);
router.post("/saveItems", toggleSave);
router.get("/getRecommendations/:userId", getRecommendations);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPasswordWithOTP", resetPasswordWithOTP);
module.exports = router;
