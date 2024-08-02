const { default: axios } = require("axios");
const User = require("../models/User");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

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

const upgradeUser = async (req, res) => {
  const { email, amount } = req.body;
  if (!email || !amount) {
    return res.status(400).json({ message: "Email and amount are required" });
  }

  let subscriptionStatus;
  let subscriptionExpiration;

  if (amount === 5) {
    subscriptionStatus = "monthly";
    subscriptionExpiration = new Date();
    subscriptionExpiration.setMonth(subscriptionExpiration.getMonth() + 1);
  } else if (amount === 40) {
    subscriptionStatus = "yearly";
    subscriptionExpiration = new Date();
    subscriptionExpiration.setFullYear(
      subscriptionExpiration.getFullYear() + 1
    );
  } else {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const payload = {
    amount: amount.toString(),
    currency: "usd",
    order_id: uuidv4(),
    url_callback: "http://localhost:3000/success",
  };

  try {
    const bufferdata = Buffer.from(JSON.stringify(payload))
      .toString("base64")
      .concat(process.env.CRYPTOMUS_API_KEY);
    const sign = crypto.createHash("md5").update(bufferdata).digest("hex");

    const { data } = await axios.post(
      `${process.env.CRYPTOMUS_API_URI}/payment`,
      payload,
      {
        headers: {
          merchant: process.env.CRYPTOMUS_MERCHANT_ID,
          sign,
          "Content-Type": "application/json",
        },
      }
    );

    await User.updateOne(
      { email },
      {
        subscriptionStatus,
        subscriptionExpiration,
        $inc: { interviewCount: 1 },
      }
    );

    return res.status(200).json({ paymentLink: data?.result?.url });
  } catch (error) {
    console.error(
      "Error upgrading user:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

const handlePaymentSuccess = async (req, res) => {
  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({ message: "Order ID is required" });
  }

  try {
    // Implement your logic to handle the payment success callback from Cryptomus
    console.log("Payment success for order ID:", order_id);
    res.status(200).json({ message: "Payment success" });
  } catch (error) {
    console.error("Error handling payment success:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUserStatus,
  upgradeUser,
  handlePaymentSuccess,
};
