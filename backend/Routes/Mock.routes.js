// routes/mockInterviewRoutes.js
const express = require("express");
const router = express.Router();
const {
  createMockInterview,
  getMockInterview,
  getMockInterviewsByEmail,
  getUserStatus,
} = require("../Controller/MockController.js");

router.post("/mock-interview", createMockInterview);
router.get("/mock-interview/:mockId", getMockInterview);
router.get("/mock-interviews", getMockInterviewsByEmail);
router.get("/user-status", getUserStatus);

module.exports = router;
