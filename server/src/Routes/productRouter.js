const Router = require('express');
const auth = require('../Middelwares/auth.js');
const upload = require('../Middelwares/multer.js');
const { uploadImages, createProduct, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdLavelCatName, getAllProductsByThirdLavelCatId, getAllProductsByPrice, getProductsCount, getAllFeaturedProducts, deleteProduct, getProduct, deleteCloudinaryImage, updateProduct } = require('../Controllers/product.controller.js');
const { get } = require('http');


const productRouter = Router();

productRouter.post("/uploadImages", auth, upload.array('images'),uploadImages);
productRouter.post("/create", auth, createProduct);
productRouter.get("/getAll", getAllProducts); 
productRouter.get("/getAllByCatId/:id", getAllProductsByCatId); 
productRouter.get("/getAllByCatName", getAllProductsByCatName); 
productRouter.get("/getAllBySubCatId/:id", getAllProductsBySubCatId); 
productRouter.get("/getAllBySubCatName", getAllProductsBySubCatName);
productRouter.get("/getAllByThirdLavelCatId/:id", getAllProductsByThirdLavelCatId);
productRouter.get("/getAllByThirdLavelCatName", getAllProductsByThirdLavelCatName); 
productRouter.get("/getAllByPrice", getAllProductsByPrice);
productRouter.get("/getProductsCount", getProductsCount);
productRouter.get("/getAllFeaturedProducts", getAllFeaturedProducts);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct); // Obtener un producto por ID
productRouter.delete("/deleteImage",auth,deleteCloudinaryImage);
productRouter.put("/updateProduct/:id", auth, updateProduct);

module.exports = productRouter;