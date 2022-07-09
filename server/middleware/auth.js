const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["token"];

    if (!token) {
        return res.status(401).send("A token is required for authenication.")
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        return res.status(400).send("Invalid Token: " + error.message);
    }
    return next();
};

module.exports = verifyToken;
