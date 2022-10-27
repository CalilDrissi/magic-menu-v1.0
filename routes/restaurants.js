const express = require("express");

const router = express.Router();

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurants");

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
