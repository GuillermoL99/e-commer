
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDb = require('./config/connectDb.js');
const userRouter = require('./Routes/userRoutes.js');
const path = require('path');
const fs = require('fs');
const categoryRouter = require('./Routes/categoryRoutes.js');
const productRouter = require('./Routes/productRouter.js');
const cartRouter = require('./Routes/cartRoutes.js');
const myListRouter = require('./Routes/myListRoutes.js');
const addressRouter = require('./Routes/addressRoutes.js');

// Configurar dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Crear la carpeta uploads si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('Carpeta uploads creada');
}

// Middlewares
app.use(helmet({
    crossOriginResourcePolicy : false
} )); // Seguridad

// Configuración de CORS más específica para permitir credenciales
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5174',
    'http://localhost:5173', // Puerto alternativo
    'http://localhost:5174'  // Puerto principal
];

app.use(cors({
    origin: function (origin, callback) {
        // Permitir requests sin origin (como aplicaciones móviles o Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie']
}));

app.use(morgan('combined')); // Logging
app.use(express.json());
app.use(cookieParser()); // Parser de cookies

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(uploadDir));

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente'+ process.env.PORT);
});

app.use('/api/users', userRouter); // Rutas de usuarios
app.use('/api/categories', categoryRouter); // Rutas de categorías
app.use('/api/products', productRouter); // Rutas de productos
app.use('/api/cart', cartRouter); // Rutas del carrito
app.use('/api/mylist', myListRouter); // Rutas de la lista de deseos
app.use('/api/addresses', addressRouter); // Rutas de direcciones






// Conectar a la base de datos y luego iniciar el servidor
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch((error) => {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
});

