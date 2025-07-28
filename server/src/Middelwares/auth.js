const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token no proporcionado",
                error: true
            });
        }

        const decode = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        
        if (!decode){
            return res.status(401).json({
                success: false,
                message: "Token inválido",
                error: true
            });
        }

        req.userId = decode.id;

        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(401).json({
            success: false,
            message: "no estas logueado o el token es inválido",
            error: true
        });
    }
}

module.exports = auth;