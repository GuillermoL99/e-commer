const { error } = require('console');
const cartProduct = require('../Models/cartproduct');
const user = require('../Models/user');

const addToCartItemController = async (req, res) => {
    try {
        const userId = req.userId
        const { productId } = req.body;

        

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Provide productId",
                error: true
            });
        }

        const checkItemCart = await cartProduct.findOne({ 
            userId: userId,
            productId: productId
        });

        if (checkItemCart) {
            
            return res.status(400).json({
                success: false,
                message: "Product already exists in cart",
                error: true
            });
        }

        const cartItem = new cartProduct({
            quantity: 1,
            productId: productId,
            userId: userId
        });

        const save = await cartItem.save();
       

        const updateCartUser = await user.updateOne({_id : userId},{
            $push:{
                shopping_cart: productId
            }
        });

       

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: save
        });


    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: error.message
        });
        
    }
}

const getCartItemsController = async (req, res) => {
     
    try {
        
        const userId = req.userId;

        const cartItems = await cartProduct.find({ 
            userId: userId
        }).populate('productId');

       
        const totalCartItems = await cartProduct.countDocuments();
        console.log('Total cart items in database:', totalCartItems);

        return res.status(200).json({
            success: true,
            error: false,
            data: cartItems,
            count: cartItems.length,
            userId: userId // Include userId in response for debugging
        });


    } catch (error) {
      
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: error.message
        });
        
    }


}

const updateCartItemQtyController = async (req, res) => {
    try {
       
        
        const userId = req.userId;
        const { _id, qty } = req.body;

        if (!_id || !qty) {
            return res.status(400).json({
                success: false,
                message: "Provide _id and quantity",
                error: true,
                received: { _id, qty, body: req.body }
            });
        }

        // Validar que qty sea un número positivo
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive number",
                error: true
            });
        }

        const updatedCartItem = await cartProduct.updateOne(
            { 
                _id: _id, 
                userId: userId 
            },
            { 
                quantity: qty 
            })

        if (updatedCartItem.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found or you don't have permission to update it",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Cart item updated successfully",
            data: updatedCartItem
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: error.message
        });
        
    }
}

const deleteCartItemQtyController = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Para depuración
        console.log('Content-Type:', req.headers['content-type']); // Para depuración
        
        const userId = req.userId;
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Provide _id",
                error: true,
                received: { _id, body: req.body }
            });
        }

        // Buscar el item del carrito antes de modificarlo
        const cartItem = await cartProduct.findOne({
            _id: _id,
            userId: userId
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found or you don't have permission to delete it",
                error: true
            });
        }

        let result;
        
        // Si la cantidad es mayor a 1, decrementar en 1
        if (cartItem.quantity > 1) {
            result = await cartProduct.updateOne(
                { _id: _id, userId: userId },
                { 
                    $inc: { quantity: -1 } // Decrementar en 1
                }
            );
            
            return res.status(200).json({
                success: true,
                error: false,
                message: "Cart item quantity decreased by 1",
                data: {
                    action: "quantity_decreased",
                    previousQuantity: cartItem.quantity,
                    newQuantity: cartItem.quantity - 1,
                    updateResult: result
                }
            });
        } else {
            // Si la cantidad es 1, eliminar el item completamente
            const deletedCartItem = await cartProduct.deleteOne({
                _id: _id,
                userId: userId
            });

            // Remover el producto del array shopping_cart del usuario
            const updateCartUser = await user.updateOne(
                { _id: userId },
                {
                    $pull: {
                        shopping_cart: cartItem.productId
                    }
                }
            );

            return res.status(200).json({
                success: true,
                error: false,
                message: "Cart item deleted completely (quantity was 1)",
                data: {
                    action: "item_deleted",
                    deletedItem: cartItem,
                    deleteResult: deletedCartItem,
                    userUpdate: updateCartUser
                }
            });
        }

    } catch (error) {
        console.error('Error processing cart item:', error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: error.message
        });
    }
}



const removeCartItemCompletelyController = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Para depuración
        console.log('Content-Type:', req.headers['content-type']); // Para depuración
        
        const userId = req.userId;
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Provide _id",
                error: true,
                received: { _id, body: req.body }
            });
        }

        // Buscar el item del carrito antes de eliminarlo
        const cartItem = await cartProduct.findOne({
            _id: _id,
            userId: userId
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found or you don't have permission to delete it",
                error: true
            });
        }

        // Eliminar el item del carrito completamente
        const deletedCartItem = await cartProduct.deleteOne({
            _id: _id,
            userId: userId
        });

        // Remover el producto del array shopping_cart del usuario
        const updateCartUser = await user.updateOne(
            { _id: userId },
            {
                $pull: {
                    shopping_cart: cartItem.productId
                }
            }
        );

        return res.status(200).json({
            success: true,
            error: false,
            message: "Cart item removed completely from cart",
            data: {
                action: "item_removed_completely",
                deletedItem: cartItem,
                deleteResult: deletedCartItem,
                userUpdate: updateCartUser
            }
        });

    } catch (error) {
        console.error('Error removing cart item:', error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: error.message
        });
    }
}


module.exports = {
    addToCartItemController,
    getCartItemsController,
    updateCartItemQtyController,
    deleteCartItemQtyController,
    removeCartItemCompletelyController
};