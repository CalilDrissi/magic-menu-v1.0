const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect the db
connectDB();

// loading routes
const restaurants = require("./routes/restaurants");
const items = require("./routes/items");





// initialize the app
const app = express();

// load middlewares
app.use(express.json());





// load  routers
app.use("/api/v1/restaurants", restaurants);
app.use("/api/v1/items", items);




// load error middleware
app.use(errorHandler);









/* ##################################################*/
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


// Handle unhandled promise rejections  - this is better than the try catch in db.js
// used in the ecomm version
process.on("unhandledRejection", (err, promise) => {
  // console.log(`Error: ${err.message}`.red);
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
