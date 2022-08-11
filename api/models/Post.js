const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        max: 40,
    },
    newDescWords: {
        type: Array,
        default:[],
        required: true,
    },
    loc: {
        type: String,
        required: true,
    },
    state: {
        type: String,
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
    postSection: {
        type: Array,
        default: [],
    },
    postComments: {
        type: Array,
        default: [],
    },
    postLikes: {
        type: Array,
        default: [],
    },
    enableComments: {
        type: Boolean,
        default: true,
    },
}, 
{ 
    collection: "travel",
    timestamps:true 
});

module.exports = mongoose.model("Post", PostSchema);