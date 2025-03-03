const express = require("express");
const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Initialize Stripe with Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
  try {
    const { tokenId, amount } = req.body;

    const charge = await stripe.charges.create({
      source: tokenId,
      amount,
      currency: "usd",
    });

    res.status(200).json({ success: true, charge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
