const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if( !token )
        return res.status(401).json({errorMessage: "Unauthorised"});

        const verified = jwt.verify(token, process.env.jwt_Secret);
        req.user = verified.user;
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({errorMessage: "Unauthorised"});
    }
}

module.exports = userAuth;