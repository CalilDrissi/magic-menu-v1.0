const mongoose = require("mongoose");


const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add a course title']
      },
      photo: {
          type: String,
          default: 'no-photo.jpg'
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
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      }

      // add a category filed. 
       // add it in the restaurant model


      // in stock

    //name

    //desc

    //price

    //ingredients + quantity

    //image

    // restaurant

});




module.exports = mongoose.model('Item', ItemSchema);