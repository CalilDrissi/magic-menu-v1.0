const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const Item = require("../models/Item");

const router = express.Router({
  mergeParams: true,
});

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  addImage,
} = require("../controllers/Items");
const Restaurant = require("../models/Restaurant");

router
  .route("/")
  .get(
    advancedResults(Item, {
      path: "restaurant",  
      select: "name address"
    }),
    getItems
  )
  .post(createItem);

router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

router.route("/:id/photo").put(addImage);

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
