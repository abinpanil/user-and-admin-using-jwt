const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "ouyughvbnbkjhgvcv";

// register
router.post("signup", async (req, res) => {
    try {
        const { email, password, passwordVarify } = req.body;

        // validation
        if (!email || !password || !passwordVarify)
            return res
                .status(400)
                .json({ errorMessage: "Please fill all fields" });

        if (password.length < 6)
            return res
                .status(400)
                .json({ errorMessage: "Please enter a passwrod atleast 6 charector" });

        if (password !== passwordVarify)
            return res
                .status(400)
                .json({ errorMessage: "Please enter same password" });

        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ errorMessage: "An account with this emaill already exists" });

        // hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // save user to database
        const newUser = new User({
            email, passwordHash
        });

        const saveUser = await newUser.save();

        // sign in with token
        const token = jwt.sign({
            user: saveUser._id
        }, jwtSecret);

        // sent the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate
        if ( !email || !password )
            return res
                .status(400)
                .json({ errorMessage: "Please fill all fields" });

        const existingUser = await User.findOne({ email: email });
        if ( !existingUser )
            return res
                .status(400)
                .json({ errorMessage: "Wrong email or password" });

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if( !passwordCorrect )
        return res
                .status(400)
                .json({ errorMessage: "Wrong password" });

        // sign in with token
        const token = jwt.sign({
            user: existingUser._id
        }, jwtSecret);

        // sent the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

// logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})


module.exports = router;