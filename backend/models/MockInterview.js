const mongoose = require("mongoose");
const { Schema } = mongoose;

const mockInterviewSchema = new Schema(
  {
    jsonMockResp: { type: String, required: true },
    jobPosition: { type: String, required: true },
    jobDescription: { type: String, required: true },
    jobExperience: { type: String, required: true },
    createdBy: { type: String, required: true },
    mockId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const MockInterview = mongoose.model("MockInterview", mockInterviewSchema);

module.exports = MockInterview;

