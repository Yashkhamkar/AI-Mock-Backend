const UserAnswers = require("../models/UserAnswer");

const UserFeedback = async (req, res) => {
  const {
    mockIdRef,
    question,
    answer,
    userAnswer,
    feedback,
    rating,
    userEmail,
  } = req.body;
  console.log(req.body);
  const userAns = new UserAnswers({
    mockIdRef,
    question,
    answer,
    userAnswer,
    feedback,
    rating,
    userEmail,
  });
  try {
    const savedUserAnswer = await userAns.save();
    console.log("instered");
    console.log(savedUserAnswer);
    res.status(200).json(savedUserAnswer);
  } catch (error) {
    console.log(error);
    const UserAnswers = require("../models/UserAnswer");

    // Controller function to save user feedback
    const UserFeedback = async (req, res) => {
      const {
        mockIdRef,
        question,
        answer,
        userAnswer,
        feedback,
        rating,
        userEmail,
      } = req.body;

      // Validation
      if (
        !mockIdRef ||
        !question ||
        !answer ||
        !userAnswer ||
        !feedback ||
        !rating ||
        !userEmail
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Logging the request body for debugging
      console.log("Received request body:", req.body);

      // Creating a new UserAnswers instance
      const userAns = new UserAnswers({
        mockIdRef,
        question,
        answer,
        userAnswer,
        feedback,
        rating,
        userEmail,
      });

      try {
        // Saving the user answer to the database
        const savedUserAnswer = await userAns.save();
        console.log("Inserted");
        console.log(savedUserAnswer);
        res.status(200).json(savedUserAnswer);
      } catch (error) {
        console.error("Error saving user answer:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };

    // Controller function to get user answers by mockId
    const getUserAnswersByMockId = async (req, res) => {
      const { mockId } = req.query;

      if (!mockId) {
        return res.status(400).json({ message: "mockId is required" });
      }

      try {
        const userAnswers = await UserAnswers.find({ mockIdRef: mockId });
        if (userAnswers.length === 0) {
          return res
            .status(404)
            .json({ message: "No user answers found for the given mockId" });
        }
        res.status(200).json(userAnswers);
      } catch (error) {
        console.error("Error retrieving user answers:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };

    module.exports = { UserFeedback, getUserAnswersByMockId };

    res.status(500).json(error);
  }
};

// Controller function to get user answers by mockId
const getUserAnswersByMockId = async (req, res) => {
  const { mockId } = req.query;

  if (!mockId) {
    return res.status(400).json({ message: "mockId is required" });
  }

  try {
    const userAnswers = await UserAnswers.find({ mockIdRef: mockId });
    if (userAnswers.length === 0) {
      return res
        .status(404)
        .json({ message: "No user answers found for the given mockId" });
    }
    res.status(200).json(userAnswers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { UserFeedback, getUserAnswersByMockId };
