const mongoose = require('mongoose');


const RestaurantSchema = new mongoose.Schema(
    {
        // name
        name: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
          },
        slug: String,
        description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
        },
        phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters']
          },
          email: {
            type: String,
            match: [
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              'Please add a valid email'
            ]
          },

           // address
          address: {
            type: String,
            required: [true, 'Please add an address']
          },
        //opening hours
        openingTime: {
            type: String,
            required: [true, 'Please add an Opening time'],
        },
        closingTime: {
            type: String,
            required: [true, 'Please add a Closing time']
        },
        //cuisine
        cuisine: {
            // make this an array that can hold multiple types
            type:  String,
            required: [true, 'Please add a Cuisine']
        },
        photo: {
            type: String,
            default: 'no-photo.jpg'
          },
          // add categories ARRAY and ref it in the item model using a form that will let you only select from these options, or you can add new one.
          // and update the restaurant categories field. 



        //------------------
        //fidelity points
        //reward for fidelity
        //reward condition
        //fidelity points sharable state
        //fidelity point expiration period
        //tables number

    }
);


// Reverse populate with virtuals
//*! learn more about this. 
RestaurantSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'restaurant',
  justOne: false
});


// Cascade delete courses when a bootcamp is deleted
RestaurantSchema.pre('remove', async function(next) {
  console.log(`Items being removed from Restaurant ${this._id}`);
  await this.model('Item').deleteMany({ restaurant: this._id });
  next();
});


module.exports = mongoose.model('Restaurant', RestaurantSchema);