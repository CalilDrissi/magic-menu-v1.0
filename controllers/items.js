const path = require('path');
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

//*TODO  add a photo to the menu  item
//*? route PUT /api/v1/items/:id/photo
//*! Private
exports.addImage = asyncHandler( async (req, res, next ) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  if(!req.files) {
    return next(
      new ErrorResponse(`no image uploaded`, 400)
    ); 
  }

  // console.log(req.files)

  const file = req.files.file;

  // validation  file is photo . file size not too big.
  if(!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`must be an image file`, 400)
    );  
  }
// check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`must be under 1MB`, 400)
    );  
  }

// create custom file name
file.name = `photo_${item._id}${path.parse(file.name).ext}`;

// console.log(file.name);

// upload the photo

file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err=> {
  if(err) {
    console.error(err);
    return next(
      new ErrorResponse(`upload failed`, 500)
    );  
  }
await Item.findByIdAndUpdate(req.params.id, {photo: file.name});
res.status(200).json({
  success: true,
  data: file.name
})

})

});








//*? read a single menu item
// @route     GET /api/v1/items/:id
// @access    Public
exports.getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate({
    path: 'restaurant',
    select: 'name'
  });

  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: item
  });
});



//*? update a menu item
// * @route     PUT /api/v1/items/:id
// *! @access    Private

exports.updateItem = asyncHandler( async (req, res, next) => {
  let  item = await Item.findById(req.params.id);
  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate({
    path: 'restaurant',
    select: "name"
  });

  res.status(200).json({
    success: true,
    data: item
  });


});



//*? delete a menu item
// * @route     DELETE /api/v1/items/:id
// *! @access    Private

exports.deleteItem = asyncHandler( async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

await item.remove();

  res.status(200).json({
    success: true,
    data:  {}
  });


});



//*? get all menu items of a single restaurant
// @desc      Get items
// @route     GET /api/v1/items
// @route     GET /api/v1/restaurants/:restaurantId/items
// @access    Public

exports.getItems = asyncHandler(async (req, res, next) => {
    let query; 
    if (req.params.restaurantId) {
      query = Item.find({ restaurant: req.params.restaurantId }).populate(
        {
          path: 'restaurant',
          select: 'name'
        }
      );
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