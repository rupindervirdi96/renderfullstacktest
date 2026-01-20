const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from Express 👋",
    time: new Date().toISOString(),
  });
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});