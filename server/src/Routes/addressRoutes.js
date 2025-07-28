const Router = require('express');
const { 
    createAddressController, 
    getUserAddressesController, 
    updateAddressController, 
    deleteAddressController 
} = require('../Controllers/address.controller.js');
const auth = require('../Middelwares/auth.js');

const addressRouter = Router();

// Crear nueva dirección
addressRouter.post("/create", auth, createAddressController);

// Obtener todas las direcciones del usuario
addressRouter.get("/", auth, getUserAddressesController);

// Actualizar dirección
addressRouter.put("/:id", auth, updateAddressController);

// Eliminar dirección
addressRouter.delete("/:id", auth, deleteAddressController);

module.exports = addressRouter;
