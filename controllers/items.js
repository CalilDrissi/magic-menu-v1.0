const path = require("path");
const imageKit = require("imagekit");
const Item = require("../models/Item");
const Restaurant = require("../models/Restaurant");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");




//*TODO Create a menu Item
//*? route POST /api/v1/restaurants/:restaurantId/Items
//*! Private

exports.createItem = asyncHandler(async (req, res, next) => {
  req.body.restaurant = req.params.restaurantId;
  req.body.user = req.user.id;

  const restaurant = await Restaurant.findById(req.params.restaurantId);
  if (!restaurant) {
    return next(
      new ErrorResponse(
        `Restaurant not found with id of ${req.params.restaurantId}`,
        404
      )
    );
  }

  // check permission
  if (restaurant.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add this Item to ${restaurant.name}`,
        401
      )
    );
  }

  const item = await Item.create(req.body);

  res.status(200).json({
    success: true,
    resto: restaurant.name,
    data: item,
  });
});

//*TODO  add a photo to the menu  item
//*? route PUT /api/v1/items/:id/photo
//*! Private
exports.addImageLocal = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  if (item.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add photo to this item for ${restaurant.name}`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`no image uploaded`, 400));
  }

  // console.log(req.files)

  const file = req.files.file;

  // validation  file is photo . file size not too big.
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`must be an image file`, 400));
  }
  // check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`must be under 1MB`, 400));
  }

  // create custom file name
  file.name = `photo_${item._id}${path.parse(file.name).ext}`;

  // console.log(file.name);

  // upload the photo

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`upload failed`, 500));
    }
    
    await Item.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });



});




//*! __________
exports.addImage= asyncHandler(async (req, res, next) => {

  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  if (item.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add photo to this item for ${restaurant.name}`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`no image uploaded`, 400));
  }

  const file = req.files.file;

// validation  file is photo . file size not too big.
if (!file.mimetype.startsWith("image")) {
  return next(new ErrorResponse(`must be an image file`, 400));
}
// check file size
if (file.size > process.env.MAX_FILE_UPLOAD) {
  return next(new ErrorResponse(`must be under 1MB`, 400));
}

 // create custom file name
 file.name = `photo_${item._id}${path.parse(file.name).ext}`;

 const img = `https://ik.imagekit.io/magicmenuv1/${file.name}`;



// here add upload to cdn 

const imagekit = new imageKit({

  publicKey : "public_gOJ5jA/zd/6CpryYQFcNsSaczMw=",

  privateKey : process.env.PRIVATE_KEY,

  urlEndpoint : "https://ik.imagekit.io/magicmenuv1"

});


const uploadResponse = await imagekit.upload({
  file: file.data, 
  fileName: file.name,
  isPrivateFile: false,
  useUniqueFileName:false
});



await Item.findByIdAndUpdate(req.params.id, { photo: img });
res.status(200).json({
  success: true,
  data: img,
});





});









//*? read a single menu item
// @route     GET /api/v1/items/:id
// @access    Public
exports.getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate({
    path: "restaurant",
    select: "name",
  });

  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: item,
  });
});






//*? update a menu item
// * @route     PUT /api/v1/items/:id
// *! @access    Private

exports.updateItem = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id);
  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  if (item.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this Item for ${restaurant.name}`,
        401
      )
    );
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: "restaurant",
    select: "name",
  });

  res.status(200).json({
    success: true,
    data: item,
  });
});




//*? delete a menu item
// * @route     DELETE /api/v1/items/:id
// *! @access    Private

exports.deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No Item with the id of ${req.params.id}`, 404)
    );
  }

  if (item.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this Item for ${restaurant.name}`,
        401
      )
    );
  }

  await item.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});



//*? get all menu items of a single restaurant
// @desc      Get items
// @route     GET /api/v1/items
// @route     GET /api/v1/restaurants/:restaurantId/items
// @access    Public

exports.getItems = asyncHandler(async (req, res, next) => {
  if (req.params.restaurantId) {
    const items = await Item.find({ restaurant: req.params.restaurantId });
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
