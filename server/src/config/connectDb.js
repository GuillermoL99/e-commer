const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

if(!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a la base de datos establecida correctamente');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Termina el proceso si no se puede conectar
    }
}

module.exports = connectDb;