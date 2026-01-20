const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/hello", (req, res) => {
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: "rupzvirdi.96@gmail.com",
  //     pass: "rgkr mssa lmuq wrud",
  //   },
  //   connectionTimeout: 10000,
  //   greetingTimeout: 10000,
  //   socketTimeout: 10000,
  // });

  // return transporter.sendMail({
  //   from: `"Puncham Cars" <rupzvirdi.96@gmail.com>`,
  //   to: "rupindervirdi96@gmail.com",
  //   subject: "New Dream Car Form Submission",
  //   html,
  // });
  res.json({ message: "Hello from the server!", time: new Date().toISOString() });
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
