const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
// const fileupload = require('express-fileupload');

dotenv.config();
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));
// app.use(fileupload());

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name, )
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=> {
    res.status(200).json("File has been uploaded.")
})


// app.post("/api/upload", (req, res) => {
//     let file = req.file.image;
//     let date = new Date();
//     let imageName = date.getDate() + date.getTime() + file.name;
//     let path = '/public/uploads/' +imageName;
//     file.mv(path, (err, res) => {
//         if(err){
//             throw err;
//         } else {
//             res.json(`uploads/${imageName}`);
//         }
//     })
// })

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("5000", ()=>{
    console.log("Backend is running.")
})