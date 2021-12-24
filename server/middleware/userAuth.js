
function auth(req, res, next) {
    try {
        console.log(req.cookies);
    } catch (e) {
        console.log(e);
        res.status(401).json({errorMessage: "Unauthorised"});
    }
}

module.exports = auth;