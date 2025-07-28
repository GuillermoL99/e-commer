const { error } = require("console");
const ProductModel = require("../Models/product.modal");

const cloudinary = require('cloudinary').v2;
const fs = require('fs');



cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_key_secret,
    secure: true // Usar HTTPS    
})

var imagesArr = [];

// Sube imágenes a Cloudinary y las almacena en un array temporal
async function uploadImages(req, res) {
    try {
        imagesArr = [];

        const images = req.files;

        const options = {
            use_filename: true, 
            unique_filename: true,
            overwrite: false
        };

        for (let i = 0; i < images?.length; i++) {
            const result = await cloudinary.uploader.upload(
                images[i].path,
                options
            );
            imagesArr.push(result.secure_url);
            fs.unlinkSync(images[i].path); // Eliminar el archivo local después de subirlo
        }
        
        return res.status(200).json({
            images: imagesArr
        });

    } catch (error) {
        console.error("Error en uploadImages:", error);
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

// Crea un nuevo producto con los datos recibidos
async function createProduct(req, res) {
    try {
        let product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            images: imagesArr,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            catName: req.body.catName,
            catId: req.body.catId,
            subCatId: req.body.subCatId,
            subCat: req.body.subCat,
            thirdsubCat: req.body.thirdsubCat,
            thirdsubCatId: req.body.thirdsubCatId,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
            discount: req.body.discount,
            productRam: req.body.productRam,
            productWeigth: req.body.productWeigth
        });

        product = await product.save();

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not created",
                error: true
            });
        }
       
        imagesArr = []; // Limpiar el array de imágenes después de crear el producto

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            error: false,
            product: product
        });
    } catch (error) {
      
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

// Obtiene todos los productos con paginación
async function getAllProducts (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find().populate
        ("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por ID de categoría
async function getAllProductsByCatId (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)|| 10000
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find({catId: req.params.id} ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por nombre de categoría
async function getAllProductsByCatName (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)|| 10000
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find({catName: req.query.catName} ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por ID de subcategoría
async function getAllProductsBySubCatId (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)|| 10000
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find({subCatId: req.params.id} ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por nombre de subcategoría
async function getAllProductsBySubCatName (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)|| 10000
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find({subCat: req.query.subCat} ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por ID de subcategoría de tercer nivel
async function getAllProductsByThirdLavelCatId (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)|| 10000
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find({thirdsubCatId: req.params.id} ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por nombre de subcategoría de tercer nivel
async function getAllProductsByThirdLavelCatName (req,res) {

    try {
        
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage)|| 10000
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({
                success: false,
                message: "page not found",
                error: true
            });
        }

        const products = await ProductModel.find({thirdsubCat: req.query.thirdsubCat} ).populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found",
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            error: false,
            products: products,
            totalPages: totalPages,
            page: page,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene productos filtrados por rango de precios
async function getAllProductsByPrice (req,res){

    let productList = [];   

    if (req.query.catId !== "" && req.query.catId !== undefined) {
        const productListArr = await ProductModel.find({catId: req.query.catId}).populate("category");

        productList = productListArr
    }
    
    if (req.query.subCatId !== "" && req.query.subCatId !== undefined) {
        const productListArr = await ProductModel.find({subCatId: req.query.subCatId}).populate("category");

        productList = productListArr
    }

    if (req.query.thirdsubCatId !== "" && req.query.thirdsubCatId !== undefined) {
        const productListArr = await ProductModel.find({thirdsubCatId: req.query.thirdsubCatId}).populate("category");

        productList = productListArr
    }

    const filteredProducts = productList.filter((product) => {

        if (req.query.minPrice && product.price < parseInt(+req.query.minPrice)) {
            return false;
        } 

        if (req.query.maxPrice && product.price > parseInt(+req.query.maxPrice)) {
            return false;
        }

        return true;
    });

    return res.status(200).json({
        totalPages: 0,
        page: 0,
        products: filteredProducts,
        success: true,
        error: false
    });
}

// Obtiene el número total de productos en la base de datos
async function getProductsCount (req,res){
    
    try {
        
        const productsCount = await ProductModel.countDocuments();

        if (!productsCount) {
            return res.status(404).json({
                success: false,
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            productCount: productsCount
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

// Obtiene todos los productos marcados como destacados
async function getAllFeaturedProducts (req,res) {

    try {
        
        const products = await ProductModel.find({isFeatured: true} ).populate("category")
       

        if (!products) {
            return res.status(404).json({
                success: false,
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            products: products,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}


// Elimina un producto y sus imágenes de Cloudinary
async function deleteProduct (req, res){
    
    
    try {
        
        const product = await ProductModel.findById(req.params.id).populate("category");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                error: true
            });
        }

        const images = product.images;

        let img = "";

        for (img of images){
            const imgUrl = img
            const urlArr = imgUrl.split('/');
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split('.')[0];

            if (imageName) {
                cloudinary.uploader.destroy(imageName, (error, result) => {
                    if (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    } else {
                        console.log("Image deleted successfully from Cloudinary:", result);
                    }
                });
            }
        }

        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(500).json({
                success: false,
                message: "Product not deleted",
                error: true
            });
        }

        return res.status(200).json({
            success: true,  
            message: "Product deleted successfully",
            error: false,
            product: deletedProduct
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

async function getProduct(req,res){

    try {
        
        const product = await ProductModel.findById(req.params.id).populate("category");
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                error: true
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            error: false,
            product: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

async function deleteCloudinaryImage(imageUrl) {
    try {
        if (!imageUrl) return false;
        
        // Extraer el public_id de la URL de Cloudinary
        const urlParts = imageUrl.split('/');
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        
        if (uploadIndex === -1) return false;
        
        // El public_id está después de 'upload' y la versión (v123456...)
        const publicIdParts = urlParts.slice(uploadIndex + 2); // Saltar 'upload' y versión
        const publicIdWithExtension = publicIdParts.join('/');
        const publicId = publicIdWithExtension.split('.')[0]; // Quitar extensión
        
        if (publicId) {
            const deleteResult = await cloudinary.uploader.destroy(publicId);
            console.log(`Intentando eliminar imagen con public_id: ${publicId}`);
            console.log('Resultado:', deleteResult);
            return deleteResult.result === 'ok';
        }
        
        return false;
    } catch (error) {
        console.error('Error al eliminar imagen de Cloudinary:', error);
        return false;
    }
}

async function updateProduct(req,res){

    try {
        
        const product = await ProductModel.findByIdAndUpdate(req.params.id,{

            name: req.body.name,
            description: req.body.description,
            images: imagesArr,
            brand: req.body.brand,
            price: req.body.price,
            oldPrice: req.body.oldPrice,
            catName: req.body.catName,
            catId: req.body.catId,
            subCatId: req.body.subCatId,
            subCat: req.body.subCat,
            thirdsubCat: req.body.thirdsubCat,
            thirdsubCatId: req.body.thirdsubCatId,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured,
            discount: req.body.discount,
            productRam: req.body.productRam,
            productWeigth: req.body.productWeigth

        }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                error: true
            });
        }
        imagesArr = []; // Limpiar el array de imágenes después de actualizar el producto

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            error: false,
            product: product
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
    uploadImages,
    createProduct,
    getAllProducts,
    getAllProductsByCatId,
    getAllProductsByCatName,
    getAllProductsBySubCatId,
    getAllProductsBySubCatName,
    getAllProductsByThirdLavelCatId,
    getAllProductsByThirdLavelCatName,
    getAllProductsByPrice,
    getProductsCount,
    getAllFeaturedProducts,
    deleteProduct,
    getProduct,
    deleteCloudinaryImage,
    updateProduct
};