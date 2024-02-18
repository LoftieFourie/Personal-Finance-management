const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
// const Weekly = require("./middleWare/weeklyUploads");

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

    // Run the function once the database connection is established
    // Weekly.test();
  })
  .catch((err) => console.error("DB connection failed:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port ${port}...`);
});
