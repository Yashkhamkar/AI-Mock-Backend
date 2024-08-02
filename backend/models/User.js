const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    subscriptionStatus: {
      type: String,
      enum: ["free", "monthly", "yearly"],
      default: "free",
    },
    subscriptionExpiration: { type: Date },
    interviewCount: { type: Number, default: 0 },
    payments: [
      {
        order_id: String,
        amount: String,
        currency: String,
        status: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.hasActiveSubscription = function () {
  if (this.subscriptionStatus === "free") return false;
  return (
    this.subscriptionExpiration && this.subscriptionExpiration > new Date()
  );
};

userSchema.methods.getInterviewLimit = function () {
  if (this.hasActiveSubscription()) return Infinity;
  return 3;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
