const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello, this is your API!");
});

app.use(
  cors({
    origin: [
      "http://localhost:8100",
      "http://localhost:4200",
      "https://personifi.onrender.com/",
      "https://personifi.netlify.app",
    ],
  })
);

const userRouter = require("./routes/userRoutes.js");
const costRouter = require("./routes/costRoutes.js");
const investmentRouter = require("./routes/investmentRoutes.js");

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/users", userRouter);
app.use("/api/v1/costs", costRouter);
app.use("/api/v1/investment", investmentRouter);

module.exports = app;
