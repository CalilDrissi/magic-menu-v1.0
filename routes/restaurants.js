const express = require("express");



const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");

// include other ressource routers 

const itemRouter = require('./items.js');


const router = express.Router();



//Reroute into other ressrouce routers

router.use("/:restaurantId/items", itemRouter);

router.route("/").get(getRestaurants).post(createRestaurant);

router
  .route("/:id")
  .get(getRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);



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
