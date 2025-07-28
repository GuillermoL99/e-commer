const Router = require('express');
const auth = require('../Middelwares/auth.js');
const { addToMyListController, deleteMyListController, getMyListController } = require('../Controllers/mylist.controller.js');

const myListRouter = Router();


myListRouter.post("/add", auth, addToMyListController);

myListRouter.delete("/:id", auth, deleteMyListController); // Added route for deleting an item from My List

myListRouter.get("/", auth, getMyListController); // Added route for getting all items from My List

module.exports = myListRouter;