const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAnswersSchema = new Schema(
  {
    mockIdRef: {
      type: String,
      ref: "MockInterview",
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    userAnswer: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserAnswers = mongoose.model("UserAnswers", userAnswersSchema);

module.exports = UserAnswers;
