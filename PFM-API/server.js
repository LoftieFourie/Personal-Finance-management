const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const cronScript = require("./middleWare/weeklyUploads");
const cron = require("node-cron");
const align = require("./middleWare/referanceAlign");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established!");
    // align.syncCostReferences();
  })
  .catch((err) => console.error("DB connection failed:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
