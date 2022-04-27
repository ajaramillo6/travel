const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    loc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    profilePic: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    pinterest: {
        type: String,
        default: "",
    },
    instagram: {
        type: String,
        default: "",
    },
    facebook: {
        type: String,
        default: "",
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
}, 
{ timestamps:true }
);

module.exports = mongoose.model("Post", PostSchema);