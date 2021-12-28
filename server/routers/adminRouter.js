const router = require("express").Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "hijghjbkjguil";
const User = require("../models/userModel");

// login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body

        // validation
        if (!username || !password)
            return res
                .status(400)
                .json({ errorMessage: "Please fill all fields" });

        const admin = {
            username: "admin",
            password: "admin"
        }
        if (username !== admin.username)
            return res
                .status(400)
                .json({ errorMessage: "Username error" });

        if (password !== admin.password)
            return res
                .status(400)
                .json({ errorMessage: "Password wrong" });

        // signin with token
        const token = jwt.sign({
            user: admin.username
        }, jwtSecret);

        // sent the token in a HTTP-only cookie
        res.cookie("Atoken", token, {
            httpOnly: true
        }).send();

    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.Atoken;
        if (!token)
            return res.json(false);
        jwt.verify(token, jwtSecret);
        res.send(true);
    } catch (e) {
        res.json(false);
    }
})

// logout
router.post("/logout", (req, res) => {
    res.cookie("Atoken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})

// user Display in admin home
router.post("/", async (req, res) => {
    const { search } = req.body;
    if (!search) {
        let data = await User.find();
        res.json(data);
    } else {
        let data = await User.aggregate([{$match:{email:{$regex:search}}}]);
        res.json(data);
    }

})

// block user
router.post("/block-user", async (req, res) => {
    let user = await User.findOne({ _id: req.body.id })

    if (user.isActive === true)
        await User.updateOne({ _id: user._id }, { isActive: false });
    else
        await User.updateOne({ _id: user._id }, { isActive: true });

    res.send()
})

// edit user
router.post("/edit-user", async (req, res) => {
    const { id, email } = req.body;

    if (!email)
        return res
            .status(400)
            .json({ errorMessage: "Please fill all fields" });

    const existingUser = await User.findOne({ email: email })
    if (existingUser)
        return res
            .status(400)
            .json({ errorMessage: "An account with this emaill already exists" });

    await User.updateOne({ _id: id }, { email: email });
    res.send({ status: true });
})

// delete user
router.post("/delete-user", async (req, res) => {
    await User.deleteOne({ _id: req.body.id });
    res.send();
})

module.exports = router;