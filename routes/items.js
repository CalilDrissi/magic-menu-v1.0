const express = require("express");

const router = express.Router({
    mergeParams: true
});

const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  addImage
} = require("../controllers/Items");


router.route("/").get(getItems)
    .post(createItem);

router
    .route("/:id")
    .get(getItem)
    .put(updateItem)
    .delete(deleteItem);
    

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
