const express = require("express");
const path = require("path");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 10000;

const cors = require("cors");
app.use(express.json());

// ✅ Initialize Resend ONCE
const resend = new Resend("re_j44x6Pxg_B61BPh7kCrzEAWft2W22Qog5");


app.use(
  cors({
    origin: true, // allow current origin
    credentials: true,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/hello", async (req, res) => {
  try {
    const result = await resend.emails.send({
      from: "Puncham Cars <onboarding@resend.dev>",
      to: ["rupindervirdi96@gmail.com"],
      subject: "Resend Test",
      html: "<p>If you see this, Resend works.</p>",
    });

    console.log("Email sent:", result);

    res.json({ ok: true, result });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});


app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
