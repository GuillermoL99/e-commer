const Router = require('express');
const auth = require('../Middelwares/auth.js');
const { addToCartItemController, getCartItemsController, updateCartItemQtyController, deleteCartItemQtyController, removeCartItemCompletelyController } = require('../Controllers/carProduct.controller.js');

const cartRouter = Router();

cartRouter.post("/add", auth, addToCartItemController);
cartRouter.get("/get", auth, getCartItemsController); // Added auth middleware
cartRouter.put("/update-qty", auth, updateCartItemQtyController); // Added route for updating cart item quantity
cartRouter.delete("/delete-one", auth, deleteCartItemQtyController); // Decrements quantity by 1 or deletes if qty=1
cartRouter.delete("/remove-completely", auth, removeCartItemCompletelyController); // Removes item completely regardless of quantity


module.exports = cartRouter;