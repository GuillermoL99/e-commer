const Router = require('express');
const { registerUserController, loginUserController, logoutUserController, userAvatarController, removeAvatarController, updateUserDetails, verifyEmailController, forgotPasswordController, verifyForgotPasswordOtp, resertPassword, refreshToken, userDetails } = require('../Controllers/user.controller.js');
const auth = require('../Middelwares/auth.js');
const upload = require('../Middelwares/multer.js');


const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController); // Ruta para verificar el email
userRouter.post("/login", loginUserController);
userRouter.get("/logout",auth, logoutUserController);
userRouter.put("/user-avatar",auth,upload.array('avatar'), userAvatarController);
userRouter.delete("/deleteImage",auth, removeAvatarController); // Ruta para eliminar el avatar
userRouter.put("/:id", auth, updateUserDetails); // Ruta para actualizar los detalles del usuario

// Rutas para recuperación de contraseña
userRouter.post("/forgot-password", forgotPasswordController); // Solicitar código de recuperación
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp) // Verificar código OTP de recuperación
userRouter.post("/reset-password", resertPassword); // Restablecer contraseña
userRouter.post("/refresh-token", refreshToken); // Ruta para refrescar el token
userRouter.get("/user-details", auth, userDetails); // Ruta para obtener los detalles del usuario autenticado


module.exports = userRouter; 