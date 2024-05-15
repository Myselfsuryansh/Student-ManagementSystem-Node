const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token is not provided in Authorization header'
            });
        }

        const JWT_SECRET = "DATA";
        JWT.verify(token, JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized User'
                });
            } else {
                req.body.id = decode.id;
                next();
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
