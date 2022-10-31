const express = require("express");
const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

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
} = require("../controllers/items");


router
  .route("/")
  .get(
    advancedResults(Item, {
      path: "restaurant",
      select: "name address",
    }),
    getItems
  )
  .post(protect, authorize("owner"), createItem);

router
  .route("/:id")
  .get(getItem)
  .put(protect, authorize("owner"), updateItem)
  .delete(protect, authorize("owner"),deleteItem);

router.route("/:id/photo").put(protect, addImage);


module.exports = router;
