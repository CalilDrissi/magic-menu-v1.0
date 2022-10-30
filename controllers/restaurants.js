const Restaurant = require("../models/Restaurant");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Create a single restaurants
// @route     POST /api/v1/restaurants/:id
// @access    Private
// *! okd
//*?
//**
//*TODO

exports.createRestaurant = asyncHandler(async (req, res, next) => {
  // Add user from jwt
  req.body.user= req.user.id;
  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({
    success: true,
    data: restaurant,
  });

});


// @desc      Get a single restaurants
// @route     GET /api/v1/restaurants/:id
// @access    Public
exports.getRestaurant = asyncHandler(async (req, res, next) => {

  
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(
        new ErrorResponse(
          `Restaurant not found with id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({
      success: true,
      data: restaurant,
    });
  

});

// @desc      Update a single restaurants
// @route     PUT /api/v1/restaurants/:id
// @access    Private

exports.updateRestaurant = asyncHandler(async (req, res, next) => {
    let restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return next(
        new ErrorResponse(
          `Restaurant not found with id of ${req.params.id}`,
          404
        )
      );
    }

    // check permission
    if(restaurant.user.toString() !== req.user.id ){
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this restaurant`,
          401
        )
      );
    }

    restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc      Delete a single restaurants
// @route     DELETE /api/v1/restaurants/:id
// @access    Private

exports.deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(
      new ErrorResponse(
        `Restaurant not found with id of ${req.params.id}`,
        404
      )
    );
  }
  if(restaurant.user.toString() !== req.user.id ){
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this restaurant`,
        401
      )
    );
  }

restaurant.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});



// @desc      Get all restaurants
// @route     GET /api/v1/restaurants
// @access    Public
exports.getRestaurants = asyncHandler(async (req, res, next) => {
  // const restaurants = await Restaurant.find();

  res.status(200).json(res.advancedResults);
});
