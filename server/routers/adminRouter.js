const router = require("express").Router();
const jwt = require("jsonwebtoken");
const jwtSecret = "hijghjbkjguil";
const User=require("../models/userModel");

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

// logout
router.post("/logout", (req, res) => {
    res.cookie("Atoken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})

// user Display in admin home
router.get("/", async(req, res) => {
    let data=await User.find();
    res.json(data);
})

// block user
router.post("/block-user", (req,res) => {
    console.log("ethyyy");
    let user = User.findOne({_id:req.body.id})
    console.log(user);
    if(user.isActive === true) User.updateOne({_id:user.id}, {isActive:false});

    User.updateOne({_id:user.id}, {isActive:true});
})


module.exports = router;