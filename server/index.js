const express = require("express");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");

// setup server
const app = express();
const PORT = 2000;
app.listen(process.env.PORT || PORT, () => console.log(`server started on port: ${PORT}`))

app.use(express.json());
app.use(cookieParser());

// connect mongo
mongoose.connect("mongodb+srv://user:user@cluster0.sqieg.mongodb.net/MERN?retryWrites=true&w=majority", (err) => {
    if (err) return console.log(err);
    console.log("Connected to Mongo");
});

// set up routes
app.use("/", require("./routers/userRouter"));
app.use("/admin", require("./routers/adminRouter"));

