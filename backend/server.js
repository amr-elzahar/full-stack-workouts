const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const app = require("./app");

dotenv.config({ path: path.join(".env") });
const port = process.env.PORT || 4000;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/workouts");
    console.log("CONNECTED TO DATABASE");
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

connectDB();
