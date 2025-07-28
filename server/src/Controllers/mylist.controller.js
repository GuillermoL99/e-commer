const MyList = require('../Models/myList.js');


const addToMyListController = async (req, res) => {

    try {
        
        const userId = req.userId;
        const { 
            productId, 
            productTitle, 
            image, 
            price, 
            oldPrice, 
            discount 
        } = req.body;

        const item = await MyList.findOne({
            userId: userId,
            productId: productId
        });

        if (item) {
            return res.status(400).json({
                success: false,
                message: "Product already exists in My List",
                error: true
            });
        }

        const myListItem = new MyList({
            userId: userId,
            productId: productId,
            productTitle: productTitle,
            image: image,
            price: price,
            oldPrice: oldPrice,
            discount: discount
        });

        const save = await myListItem.save();

        return res.status(200).json({
            success: true,
            message: "Product added to My List successfully",
            data: save
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

const deleteMyListController = async (req, res) => {

    try {
        
        const myListItem = await MyList.findById(req.params.id);

        if (!myListItem) {
            return res.status(404).json({
                success: false,
                message: "My List item not found",
                error: true
            });
        }

        const deletedItem = await MyList.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete My List item",
                error: true
            });
        }
        return res.status(200).json({
            success: true,
            message: "My List item deleted successfully",
            data: deletedItem
        });




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

const getMyListController = async (req, res) => {

    try {
        const userId = req.userId;

        const myListItems = await MyList.find({ userId: userId });

        return res.status(200).json({
            success: true,
            message: "My List items retrieved successfully",
            data: myListItems
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}


module.exports = {
    addToMyListController,
    deleteMyListController,
    getMyListController
};
  