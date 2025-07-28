const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user.js');

const generatedRefreshToken = async (userId) => {   
    const token = jwt.sign(
        { id: userId },
        process.env.JSON_WEB_REFRESHTOKEN_SECRET_KEY,
        { expiresIn: '7d' }
    );

    const updateRefreshToken = await UserModel.findByIdAndUpdate (
        { _id: userId },
        { refresh_Token: token },

    )

    return token;
}

module.exports = generatedRefreshToken;