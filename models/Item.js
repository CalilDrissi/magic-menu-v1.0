const mongoose = require("mongoose");


const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
      },
      description: {
        type: String,
        required: [true, 'Please add a description']
      },
      price: {
        type: Number,
        required: [true, 'Please add a price']
      },
      restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true
      },

    //name

    //desc

    //price

    //ingredients

    //image

    // restaurant

});




module.exports = mongoose.model('Item', ItemSchema);