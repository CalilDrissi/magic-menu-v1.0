const Item = require("../models/Item");
const Restaurant = require("../models/Restaurant");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");



//*TODO Create a menu Item
//*? route POST /api/v1/restaurants/:restaurantId/Items
//*! Private

exports.createItem = asyncHandler(async (req, res, next) => {
  req.body.restaurant = req.params.restaurantId;
  const restaurant  = await Restaurant.findById(req.params.restaurantId);
  if (!restaurant) {
    return next(
      new ErrorResponse(
        `Restaurant not found with id of ${req.params.restaurantId}`,
        404
      )
    );
  }

  const item = await Item.create(req.body);



  res.status(200).json({
    success: true,
    resto: restaurant.name,
    data: item
  })





});



//*? read a single menu item



//*? update a menu item



//*? delete a menu item



//*? get all menu items of a single restaurant
//*! need a where clause in the query
// @desc      Get items
// @route     GET /api/v1/items
// @route     GET /api/v1/restaurants/:restaurantId/items
// @access    Public

exports.getItems = asyncHandler(async (req, res, next) => {
    let query; 
    if (req.params.restaurantId) {
      query = Item.find({ restaurant: req.params.restaurantId });
    } else {
      query = Item.find().populate({
        path: 'restaurant',
        select: 'name'
      });
    }

    const items = await query;
    
    res.status(200).json({
        success:true,
        count: items.length,
        data: items
    })
  });