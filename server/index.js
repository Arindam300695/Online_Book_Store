const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./route/authRoute");
const bookRouter = require("./route/bookRoute");
require("dotenv").config();

// Using the express middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

const dbConnection = async () => {
 try {
  await mongoose
  .connect(
   process.env.db_url
  );
    console.log("connected to database successfully");
 } catch (error) {
  console.log(error.message)
 }
    
};
// Auth routes
app.use("/auth", authRouter);

// Book routes
app.use("/book", bookRouter);

app.listen(process.env.port || 8080, async (err) => {
  if (!err) {
    await dbConnection();
    console.log(
      `App is listening on http://localhost:${process.env.port || 8080}`
    );
  } else console.log(err.message);
});
