const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// ✅ Create transporter ONCE
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/hello", async (req, res) => {
  // 1️⃣ Respond immediately
  res.json({
    message: "Email triggered",
    time: new Date().toISOString(),
  });

  // 2️⃣ Send email in background
  transporter
    .sendMail({
      from: `"Puncham Cars" <${process.env.GMAIL_USER}>`,
      to: "rupindervirdi96@gmail.com",
      subject: "Test Email",
      html: `<p>You have a new form submission!</p>`,
    })
    .then(() => console.log("Test email sent"))
    .catch((err) => console.error("Email failed:", err));
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
