const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

// Enable CORS for the React dev server
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Create transporter ONCE
const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "rupzvirdi.96@gmail.com",
        pass: "rgkr mssa lmuq wrud",
      },
      tls: { rejectUnauthorized: false },
    });

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/hello", async (req, res) => {
  // 1️⃣ Respond immediately
  
  // 2️⃣ Send email in background
  transporter
    .sendMail({
      from: `"Puncham Cars" <rupzvirdi.96@gmail.com>`,
      to: "rupindervirdi96@gmail.com",
      subject: "Test Email",
      html: `<p>You have a new form submission!</p>`,
    })
    .then(() => res.json({ message: "Hello from Express!", time: new Date().toISOString() }))
    .catch((err) => console.error("Email failed:", err));
});

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
