// routes/mockInterviewRoutes.js
const express = require("express");
const { UserFeedback, getUserAnswersByMockId } = require("../Controller/UserAnswercontroller");

const router = express.Router();

router.post("/user-answer", UserFeedback);
router.get("/user-answer", getUserAnswersByMockId);

module.exports = router;
