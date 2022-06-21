const mongoose = require("mongoose");

const SubscriberSchema = new mongoose.Schema({
    subscriberName: {
        type: String,
        required: true,
    },
    subscriberEmail: {
        type: String,
        required: true,
        unique: true,
    },
}, 
{ timestamps:true }
);

module.exports = mongoose.model("Subscriber", SubscriberSchema);