const { error } = require("console");
const CategoryModel = require("../Models/category.modal");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { url } = require("inspector");


cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_key_secret,
    secure: true // Usar HTTPS    
})


var imagesArr = [];

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

async function createCategory ( req, res){
    try{
        let category = new CategoryModel({
            name: req.body.name,
            parentCatname: req.body.parentCatname, 
            parentId: req.body.parentId, 
            images: imagesArr
        });

        if (!category.name) {
            return res.status(500).json({
            success: false,
            message: "categoria no creada",
            error: true
            });
        }

        category = await category.save();

        imagesArr = []; // Limpiar el array de imágenes después de crear la categoría

        return res.status(201).json({
            success: true,
            message: "categoria creada",
            error: false,
            category: category
            });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}



async function getCategories(req, res) { 
    try { 
        const categories = await CategoryModel.find()
        const categoryMap = {}; 

        categories.forEach(cat =>{
            categoryMap[cat._id] = {...cat._doc, children:[]};
        })

        const rootCategories = [];  

        categories.forEach(cat => {
            if (cat.parentId) {
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);
            }
        });

        return res.status(200).json({
            success: true,
            error: false,
            data: rootCategories
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
}}


async function getCategoriesCount (req, res){ 

    try{
        const categoryCount = await CategoryModel.countDocuments({parentId: undefined});

        if (!categoryCount) {
            return res.status(500).json({
                success: false,
                error: true   
            });
        }else{
            res.send({
                categoryCount: categoryCount
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

async function getSubCategoriesCount (req, res){ 

    try{
        const subCategoryCount = await CategoryModel.find();

        if (!subCategoryCount) {
            return res.status(500).json({
                success: false,
                error: true   
            });
        }else{
            const subCatList = [];
            for (let cat of subCategoryCount) {
                if (cat.parentId!== undefined) {
                    subCatList.push(cat);
                }
            }

            res.send({
                subCategoryCount: subCatList.length
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}  

async function getCategoriesById(req,res){

    try{
        const category = await CategoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
                error: true
            });
        }


        return res.status(200).json({
            success: true,
            error: false,
            message: "Categoría encontrada",
            category: category
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }

}

// Función auxiliar para eliminar imagen de Cloudinary
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

async function deleteCategory (req, res ) {

    try {
        
        const category = await CategoryModel.findById(req.params.id);
        const images = category.images;

        for (img of images){
            const imgUrl = img;
            const urlArr = imgUrl.split('/');
            const image = urlArr[urlArr.length - 1];

            const imageName = image.split('.')[0]; // Obtener el nombre de la imagen sin extensión

            if (imageName) {
                cloudinary.uploader.destroy(imageName, (error, result) => {
                
                });
            }
        }

        const subCategory = await CategoryModel.find({ parentId: req.params.id });

        for (let i = 0; i < subCategory.length; i++){

            const thirdsubCategory = await CategoryModel.find({ parentId: subCategory[i]._id });

            for (let i = 0; i < thirdsubCategory.length; i++){
                const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
            }

            const deletedSubCat = await CategoryModel.findByIdAndDelete(subCategory[i]._id);
        }

        const deletedCat = await CategoryModel.findByIdAndDelete(req.params.id);
        if (!deletedCat) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: "Categoría eliminada correctamente",
            error: false,
            category: deletedCat
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
        
    }
}

async function updateCategory (req, res) { 

    const category = await CategoryModel.findByIdAndUpdate(req.params.id, {

        name: req.body.name,
        images: imagesArr.length > 0 ? imagesArr [0]: req.body.images, // Si hay imágenes nuevas, usarlas; si no, usar las existentes
        parentCatname: req.body.parentCatname, 
        parentId: req.body.parentId, 
        

    }, 
    { new: true });
    if (!category) {
        return res.status(404).json({
            success: false,
            message: "Categoría no se pudo actualizar",
            error: true
        });
    }

    imagesArr = []; // Limpiar el array de imágenes después de actualizar la categoría
    
    return res.status(200).json({
        success: true,
        message: "Categoría actualizada correctamente",
        error: false,
        category: category
    });
}





module.exports = {
    uploadImages,
    createCategory,
    getCategories,
    getCategoriesCount,
    getSubCategoriesCount,
    getCategoriesById,
    deleteCloudinaryImage,
    deleteCategory,
    updateCategory
};
