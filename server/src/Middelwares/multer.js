const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Crear la carpeta uploads si no existe (misma ruta que en index.js)
const uploadDir = path.join(process.cwd(), 'src', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Carpeta uploads creada en multer');
}

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
    
const upload = multer ({storage: storage})  

module.exports = upload;