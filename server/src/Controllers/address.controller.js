const Address = require('../Models/address.js');
const UserModel = require('../Models/user.js');

// Crear nueva dirección
async function createAddressController(req, res) {
    try {
        const userId = req.userId;
        const { address_line, city, state, pincode, country, address_type } = req.body;

        // Validaciones básicas
        if (!address_line || !city || !state || !pincode || !country) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios",
                error: true
            });
        }

        // Crear nueva dirección
        const newAddress = new Address({
            address_line,
            city,
            state,
            pincode,
            country,
            address_type: address_type || 'casa',
            userId
        });

        const savedAddress = await newAddress.save();

        // Agregar la dirección al array de direcciones del usuario
        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { address_details: savedAddress._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Dirección creada correctamente",
            error: false,
            data: savedAddress
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error: true
        });
    }
}

// Obtener todas las direcciones de un usuario
async function getUserAddressesController(req, res) {
    try {
        const userId = req.userId;

        const addresses = await Address.find({ 
            userId: userId, 
            status: true 
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Direcciones obtenidas correctamente",
            error: false,
            data: addresses
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error: true
        });
    }
}

// Actualizar dirección
async function updateAddressController(req, res) {
    try {
        const userId = req.userId;
        const addressId = req.params.id;
        const { address_line, city, state, pincode, country, address_type } = req.body;

        // Verificar que la dirección pertenece al usuario
        const address = await Address.findOne({ 
            _id: addressId, 
            userId: userId,
            status: true 
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Dirección no encontrada",
                error: true
            });
        }

        // Actualizar la dirección
        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            {
                address_line,
                city,
                state,
                pincode,
                country,
                address_type
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Dirección actualizada correctamente",
            error: false,
            data: updatedAddress
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error: true
        });
    }
}

// Eliminar dirección (soft delete)
async function deleteAddressController(req, res) {
    try {
        const userId = req.userId;
        const addressId = req.params.id;

        // Verificar que la dirección pertenece al usuario
        const address = await Address.findOne({ 
            _id: addressId, 
            userId: userId,
            status: true 
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Dirección no encontrada",
                error: true
            });
        }

        // Soft delete - cambiar status a false
        await Address.findByIdAndUpdate(
            addressId,
            { status: false },
            { new: true }
        );

        // Remover del array del usuario
        await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { address_details: addressId } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Dirección eliminada correctamente",
            error: false
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error: true
        });
    }
}

module.exports = {
    createAddressController,
    getUserAddressesController,
    updateAddressController,
    deleteAddressController
};
