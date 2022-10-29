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
      
      // add a category filed. 

      // in stock

    //name

    //desc

    //price

    //ingredients + quantity

    //image

    // restaurant

});




module.exports = mongoose.model('Item', ItemSchema);