// @desc      Get all restaurants
// @route     GET /api/v1/restaurants
// @access    Public
exports.getRestaurants = (req, res, next) => {
    res.status(200)
    .json({
      success: true,
      msg: "you want to see all restaurants"
    });
  };


// @desc      Get a single restaurants
// @route     GET /api/v1/restaurants/:id
// @access    Public
exports.getRestaurant =  (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `you want to see this resto: ${req.params.id}`
    })
  };


  // @desc      Create a single restaurants
// @route     POST /api/v1/restaurants/:id
// @access    Private

exports.createRestaurant = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `you want to create a new resto`
    })
}



// @desc      Update a single restaurants
// @route     PuT /api/v1/restaurants/:id
// @access    Private

exports.updateRestaurant = (req, res, next) =>{
    res.status(200).json({
        success: true,
        msg: `you want to update this resto: ${req.params.id}`
    })
}



// @desc      Delete a single restaurants
// @route     DELETE /api/v1/restaurants/:id
// @access    Private

exports.deleteRestaurant = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `you want to delete this resto: ${req.params.id}`
    })
}