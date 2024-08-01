const MockInterview = require("../models/MockInterview");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

const createMockInterview = async (req, res) => {
  try {
    const {
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      createdBy,
      mockId = uuidv4(),
    } = req.body;

    // Find the user
    const user = await User.findOne({ email: createdBy });
    if (!user) {
      await User.create({ email: createdBy });
    }

    // Check if user is allowed to create a new interview
    if (user.subscriptionStatus === "free" && user.interviewCount >= 3) {
      return res.status(403).json({
        message: "Please upgrade to premium to create more interviews",
      });
    }

    const newMockInterview = new MockInterview({
      jsonMockResp,
      jobPosition,
      jobDescription,
      jobExperience,
      createdBy,
      mockId,
    });

    await newMockInterview.save();

    // Update user's interview count
    user.interviewCount += 1;
    await user.save();

    const responses = newMockInterview._doc;

    res.status(201).json(responses);
  } catch (error) {
    console.error("Error creating mock interview:", error);
    res.status(500).json({ message: "Error creating mock interview", error });
  }
};

const getMockInterview = async (req, res) => {
  try {
    const { mockId } = req.params;
    const mockInterview = await MockInterview.findOne({ mockId });
    if (!mockInterview) {
      return res.status(404).json({ message: "Mock interview not found" });
    }
    res.status(200).json(mockInterview);
  } catch (error) {
    console.error("Error getting mock interview:", error);
    res.status(500).json({ message: "Error getting mock interview", error });
  }
};

const getMockInterviewsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }
    // console.log(email);
    const mockInterviews = await MockInterview.find({ createdBy: email });
    if (mockInterviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No mock interviews found for the given email" });
    }
    res.status(200).json(mockInterviews);
  } catch (error) {
    console.error("Error getting mock interviews by email:", error);
    res
      .status(500)
      .json({ message: "Error getting mock interviews by email", error });
  }
};

const getUserStatus = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      subscriptionStatus: user.subscriptionStatus,
      interviewCount: user.interviewCount,
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createMockInterview,
  getMockInterview,
  getMockInterviewsByEmail,
  getUserStatus,
};
