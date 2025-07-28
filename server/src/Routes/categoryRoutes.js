const Router = require('express');
const {  createCategoryWithImages, getCategories, uploadImages, createCategory, getCategoriesCount, getSubCategoriesCount, getCategoriesById, deleteCloudinaryImage, deleteCategory, updateCategory } = require('../Controllers/category.controller.js');
const auth = require('../Middelwares/auth.js');
const upload = require('../Middelwares/multer.js');


const categoryRouter = Router();


categoryRouter.post("/uploadImages", auth,upload.array('images'), uploadImages); 
categoryRouter.post("/create", auth, createCategory);
categoryRouter.get("/",  getCategories);
categoryRouter.get("/get/count",  getCategoriesCount); // Ruta para obtener el conteo de categorías
categoryRouter.get("/get/count/subCat",  getSubCategoriesCount);
categoryRouter.get("/:id",  getCategoriesById);
categoryRouter.delete("/deleteimage", auth,deleteCloudinaryImage)
categoryRouter.delete("/:id", auth,deleteCategory)
categoryRouter.put("/:id", auth, updateCategory); 




module.exports = categoryRouter;