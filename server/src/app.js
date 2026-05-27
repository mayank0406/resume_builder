const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");

app.get("/", (req, res) => {
  res.send("Resume Builder API Running...");
});


app.use("/api/auth", authRoutes);

module.exports = app;