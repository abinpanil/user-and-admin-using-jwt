const router = require("express").Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "hijghjbkjguil";
const Admin = require("../models/adminModel");

// login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username);

        // validation
        if (!username || !password)
        return res
        .status(400)
        .json({ errorMessage: "Please fill all fields" });

        const admin =  {
            username: "admin",
            password: "admin"
        }
        if ( username !== admin.username )
        return res
        .status(400)
        .json({ errorMessage: "Username error" });

        if ( password !== admin.password )
        return res
        .status(400)
        .json({ errorMessage: "Password wrong" });

        // signin with token
        const token = jwt.sign({
            user: admin.username
        }, jwtSecret);

        // sent the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

})

// logout
router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})




module.exports = router;