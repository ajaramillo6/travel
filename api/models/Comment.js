const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    subscriberCommentEmail: {
        type: String,
        required: true,
    },
    subscriberComment: {
        type: String,
        required: true,
    },
    commentsForPost: {
        type: String,
    },
}, 
{ timestamps:true }
);

module.exports = mongoose.model("Comment", CommentSchema);