const { jwt_cookie_expiry, env} = process.env;

//Token gotten from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Create a token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + jwt_cookie_expiry * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    if (env === 'production') 
    {
        options.secure = true;
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        role:user.role
    });
};

module.exports = sendTokenResponse;