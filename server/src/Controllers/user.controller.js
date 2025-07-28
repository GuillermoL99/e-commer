const UserModel = require('../Models/user.js');
const sendEmailFun = require ('../config/sendEmail.js');
const verifyEmailTemplate = require ('../utils/verifyEmailTemplate.js');
const generatedAccessToken = require('../utils/generatedAccessToken.js');
const generatedRefreshToken = require ('../utils/generatedRefreshToken.js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { send } = require('process');

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_key_secret,
    secure: true // Usar HTTPS    
})


async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Cargar todos los campos",
                error: true
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Usuario ya registrado con este correo",
                error: true
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Crear nuevo usuario
        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
            otp: verifyCode,
            otpExpires: Date.now() + 600000, // 10 minutes
        });

        await newUser.save();
        console.log('✅ Usuario guardado, intentando enviar email...');

        const emailResult = await sendEmailFun({
            sendTo: email,
            subject: "Verificación de correo electrónico",
            text: "",
            html: verifyEmailTemplate({ username: name, otp: verifyCode })
        });

        console.log('📧 Resultado del email:', emailResult);

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, 
            process.env.JSON_WEB_TOKEN_SECRET_KEY, 
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            error: false,
            message: "Usuario registrado correctamente, verifique su correo electrónico",
            token: token,
        });

    } catch (error) {
        console.error('Error en registro:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            error: true
        });
    }
}

async function verifyEmailController(req, res) {
    try {
        const {email, otp} = req.body;
        const user = await UserModel.findOne({ email:email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "usuario no encontrado",
                error: true
            });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        // Verificar si el código ha expirado
        if (!isNotExpired) {
            return res.status(400).json({
                success: false,
                message: "Código OTP expirado",
                error: true
            });
        }

        // Verificar si el código es válido
        if (!isCodeValid) {
            return res.status(400).json({
                success: false,
                message: "Código OTP inválido",
                error: true
            });
        }

        // Si llegamos aquí, el código es válido y no ha expirado
        user.verify_email = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verificado correctamente",
            error: false
        });



    } catch (error) {
        
        return res.status(500).json({
            success: true,
            message: error.message || error,
            error: true
        });
    }
}

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

     
        const user = await UserModel.findOne({ email: email });
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: true
            });
        }

        // Verificar si el email está verificado
       
        

        // Verificar status del usuario
        if (user.status !== "active") {
            return res.status(403).json({
                success: false,
                message: "Usuario inactivo o baneado",
                error: true
            });
        }

        if (user.verify_email !== true) {
            return res.status(403).json({
                success: false,
                message: "su correo electrónico no ha sido verificado",
                error: true
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Contraseña incorrecta",
                error: true
            });
        }

        const accesstoken = await generatedAccessToken(user._id);
        const refreshtoken = await generatedRefreshToken(user._id);

        const updateUser = await UserModel.findByIdAndUpdate(
            user?._id,{
             last_login_date: new Date()
            }   
        )

        const cookieOptions = {
            httpOnly: true,
            secure : true, // Solo si usas HTTPS
            sameSite: 'none', // Cambia según tus necesidades
        };
        res.cookie('refreshToken', refreshtoken, cookieOptions);
        res.cookie('accessToken', accesstoken, cookieOptions);

        return res.json ({
            success: true,
            message: "Usuario logueado correctamente",
            error: false,
            data : {
                accessToken: accesstoken,
                refreshToken: refreshtoken
            }
            
        })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || error ,
                error: true
            });
        }
}

async function logoutUserController(req, res) {
    try {
        const userid = req.userId; // Asegúrate de que el ID del usuario esté disponible en req.userId

        const cookieOptions = {
            httpOnly: true,
            secure : true, // Solo si usas HTTPS
            sameSite: 'none', // Cambia según tus necesidades
        };

        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');

        const removeRefreshToken = await UserModel.findByIdAndUpdate(
            userid,
            { refresh_Token: "" },
        
        );

        return res.json({
            success: true,
            message: "Usuario deslogueado correctamente",
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

//subir imagenes a cloudinary
async function userAvatarController(req, res) {
    try {
        const imagesArr = []; // Mover dentro de la función para evitar problemas de concurrencia

        const userId = req.userId;
        const files = req.files; // Usar req.files ya que se define como array en la ruta

        const user = await UserModel.findOne({ _id: userId });
        
        if (!user){
            return res.status(500).json({
                success: false,
                message: "Usuario no encontrado",
                error: true
            });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No se han subido archivos",
                error: true
            });
        }

        // Eliminar avatar anterior de Cloudinary si existe
        if (user.avatar) {
            const deleteSuccess = await deleteCloudinaryImage(user.avatar);
            if (deleteSuccess) {
                console.log('✅ Avatar anterior eliminado de Cloudinary');
            } else {
                console.log('⚠️ No se pudo eliminar el avatar anterior de Cloudinary');
            }
        }

        const options = {
            user_filename: true,
            unique_filename: false,
            overwrite: false,
        }

        for (let i = 0; i < files.length; i++) {
            try {
                const result = await cloudinary.uploader.upload(
                    files[i].path, 
                    options
                );
                
                imagesArr.push(result.secure_url);
                
                // Eliminar el archivo temporal después de subirlo a cloudinary
                fs.unlinkSync(files[i].path);
                
                
            } catch (uploadError) {
                console.error(`Error al subir archivo ${files[i].filename}:`, uploadError);
                // Intentar eliminar el archivo aunque haya fallado la subida
                try {
                    fs.unlinkSync(files[i].path);
                } catch (unlinkError) {
                    console.error(`Error al eliminar archivo temporal: ${unlinkError.message}`);
                }
            }
        }

        if (imagesArr.length === 0) {
            return res.status(500).json({
                success: false,
                message: "No se pudo subir ninguna imagen",
                error: true
            });
        }

        // Actualizar el avatar del usuario en la base de datos
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { avatar: imagesArr[0] },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: true
            });
        }

        user.avatar = imagesArr[0]; // Actualizar el avatar en el objeto user
         await user.save(); // Guardar los cambios en el usuario

        return res.status(200).json({
            success: true,
            _id: userId,
            avatar: imagesArr[0],
            message: "Avatar subido correctamente"
        });

    } catch (error) {
        console.error("Error en userAvatarController:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error al subir la imagen",
            error: true
        });
    }
}

async function removeAvatarController(req, res) {
    try {
        const imgUrl = req.query.img;
        const userId = req.userId;
        
        if (!imgUrl) {
            return res.status(400).json({
                success: false,
                message: "URL de imagen no proporcionada",
                error: true
            });
        }

        // Eliminar imagen de Cloudinary usando la función auxiliar
        const deleteSuccess = await deleteCloudinaryImage(imgUrl);
        
        if (deleteSuccess) {
            // Si la eliminación fue exitosa, también remover del usuario en la BD
            if (userId) {
                await UserModel.findByIdAndUpdate(
                    userId,
                    { avatar: null },
                    { new: true }
                );
            }
            
            return res.status(200).json({
                success: true,
                message: "Avatar eliminado correctamente",
                error: false
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No se pudo eliminar la imagen de Cloudinary",
                error: true
            });
        }
        
    } catch (error) {
        console.error("Error en removeAvatarController:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error al eliminar la imagen",
            error: true
        });
    }
}

// Función auxiliar para eliminar imagen de Cloudinary
async function deleteCloudinaryImage(imageUrl) {
    try {
        if (!imageUrl) return false;
        
        const urlArr = imageUrl.split('/');
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split('.')[0]; // Obtener el nombre del archivo sin extensión
        
        if (imageName) {
            const deleteResult = await cloudinary.uploader.destroy(imageName);
            return deleteResult.result === 'ok';
        }
        
        return false;
    } catch (error) {
        console.error('Error al eliminar imagen de Cloudinary:', error);
        return false;
    }
}

// actualizar datos del usuario
async function updateUserDetails (req, res) {
    try{
        const userId = req.userId;
        const { name, email,mobile, password } = req.body;

        const userExist = await UserModel.findById(userId);
        if (!userExist){
            return res.status(404).send('el usuario no se actualizo')
        }

        let verifyCode = ""

        if (email !== userExist.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        let hashPassword = "";
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        } else {
            hashPassword = userExist.password; // Mantener la contraseña actual si no se proporciona una nueva
        }


        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email, 
                verify_email: email !== userExist.email ? false : true,
                password: hashPassword,
                otp: verifyCode !=="" ? verifyCode : null,
                otpExpires: verifyCode !== "" ? Date.now() + 600000 : ''
            },
            { new: true }
        );


        if ( email !== userExist.email) {
            await sendEmailFun({
            sendTo: email,
            subject: "Verificación de correo electrónico",
            text: "",
            html: verifyEmailTemplate({ username: name, otp: verifyCode })
        });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            data: updatedUser
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

// Función para solicitar recuperación de contraseña
async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: true
            });
        }

        else {
            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp = verifyCode;
            user.otpExpires = Date.now() + 600000; // 10 minutos de

            await user.save();
   
            await sendEmailFun({
                sendTo: email,  
                subject: "Código de recuperación de contraseña",
                text: "",
                html: verifyEmailTemplate({ username: user.name, otp: verifyCode })
            });

        return res.status(200).json({
            success: true,
            message: "Código de recuperación enviado a tu correo electrónico",
            error: false
        });
        }

        // Generar código OTP para recuperación de contraseña
        

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}


async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: true
            });
        }

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Por favor, proporciona el correo electrónico y el código OTP",
                error: true
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Código OTP inválido",
                error: true
            });
        }

        const currentTime = new Date().toISOString();
        if (user.otpExpires < currentTime) {
            return res.status(400).json({
                success: false,
                message: "El código OTP ha expirado",
                error: true
            });
        }

        user.otp = "";
        user.otpExpires = "";

        await user.save();  

        return res.status(200).json({
            success: true,
            message: "Código OTP verificado correctamente",
            error: false
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

// resetear contraseña
async function resertPassword (req, res) { 
    try{
        const {email, newPassword, confirPassword} = req.body;

        if (!email || !newPassword || !confirPassword) {
            return res.status(400).json({
                success: false,
                message: "Por favor, completa todos los campos",
                error: true
            });
        }

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "el correo no existe",
                error: true
            });
        }

        if (newPassword !== confirPassword) {
            return res.status(400).json({
                success: false,
                message: "Las contraseñas no coinciden",
                error: true
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(confirPassword, salt);

        user.password = hashedPassword;
        await user.save();

       

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada correctamente",
            error: false
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

// refresh token
async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(' ')[1];

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No se proporcionó el token de actualización",
                error: true
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.JSON_WEB_REFRESHTOKEN_SECRET_KEY);

        if (!verifyToken) {
            return res.status(403).json({
                success: false,
                message: "Token expirado o inválido",
                error: true
            });
        }

        const userId = verifyToken?._id;
        const newAccessToken = await generatedAccessToken(userId);

        const cookieOption = {
            httpOnly: true,
            secure: true, // Solo si usas HTTPS
            sameSite: 'none', // Cambia según tus necesidades
        };
        res.cookie('accessToken', newAccessToken, cookieOption);

        return res.status(200).json({
            success: true,
            message: "Token de acceso renovado correctamente",
            error: false,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
    }
}

//get-login-user-details
async function userDetails (req, res) {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario no proporcionado",
                error: true
            });
        }

        const user = await UserModel.findById(userId).select("-password -refresh_Token");

        return res.status(200).json({
            success: true,
            message: "Detalles del usuario obtenidos correctamente",
            error: false,
            data: user
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
    registerUserController,
    loginUserController,
    logoutUserController,
    userAvatarController,
    removeAvatarController,
    updateUserDetails,
    verifyEmailController,
    forgotPasswordController,
    verifyForgotPasswordOtp,
    resertPassword,
    refreshToken,
    userDetails
};