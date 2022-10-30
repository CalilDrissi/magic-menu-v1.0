const express = require("express");
const Restaurant = require("../models/Restaurant");

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");

// include other ressource routers

const itemRouter = require("./items.js");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require('../middleware/auth');

//Reroute into other ressrouce routers

router.use("/:restaurantId/items", itemRouter);

router
  .route("/")
  .get(advancedResults(Restaurant, 'items'), getRestaurants)
  .post(protect, authorize('owner'),  createRestaurant);

router
  .route("/:id")
  .get(getRestaurant)
  .put(protect,  authorize('owner'), updateRestaurant)
  .delete(protect,  authorize('owner'),  deleteRestaurant);

/*
just for reference before using controllers
router.post('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `you want to create this resto: ${req.params.id}`
    })
})
*/

module.exports = router;
