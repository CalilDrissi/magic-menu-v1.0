const express = require("express");
const path  = require('path');
const dotenv = require("dotenv");
const fileupload = require("express-fileupload");
const connectDB = require("./config/db");
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: "./config/config.env" });

// connect the db
connectDB();

// loading routes
const restaurants = require("./routes/restaurants");
const items = require("./routes/items");
const auth = require("./routes/auth");







// initialize the app
const app = express();

// load middlewares
    // handling json
app.use(express.json());
    // handling files upload
app.use(fileupload());

// set static folder 
app.use(express.static(path.join(__dirname, 'public')));





// load  routers
app.use("/api/v1/restaurants", restaurants);
app.use("/api/v1/items", items);
app.use("/api/v1/auth", auth);




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
