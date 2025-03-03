const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const orderRoute = require("./routes/order.js");
const cartRoute = require("./routes/cart.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const app = express();
const stripe = require("stripe")(
  "sk_test_51Qr7RcP2DkK5O6onFP6nyzJKOTwV1HpJhFd0mlJ1NyNP0t8ubRm8YK68T2R2jpCNKZ8RMD70qPq2W1SAZrkVbeoB00mDOcs4fM"
);
const cors = require("cors");
dotenv.config();
console.log("error here");
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for JSON parsing
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.post("/create-checkout-session", async (req, res) => {
//   console.log("payment starting");
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "T-shirt",
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "http://localhost:5173/success",
//     cancel_url: "http://localhost:5173/failure",
//   });

//   console.log("reached end of payment");
//   return res.json(session);
// });

// Use the user route
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/payment", paymentRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Backend is here");
});

// This is your test secret API key.
// const stripe = require("stripe")(
//   "sk_test_51Qr7RcP2DkK5O6onFP6nyzJKOTwV1HpJhFd0mlJ1NyNP0t8ubRm8YK68T2R2jpCNKZ8RMD70qPq2W1SAZrkVbeoB00mDOcs4fM"
// );
// const express = require("express");
// const app = express();
// app.use(express.static("public"));

// const YOUR_DOMAIN = "http://localhost:5173";
// app.get("/", (req, res) => {
//   res.send("Hellow world");
// });

// app.post("/create-checkout-session", async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     ui_mode: "embedded",
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
//   });

//   res.send({ clientSecret: session.client_secret });
// });

// app.get("/session-status", async (req, res) => {
//   const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

//   res.send({
//     status: session.status,
//     customer_email: session.customer_details.email,
//   });
// });

// app.listen(4242, () => console.log("Running on port 4242"));
