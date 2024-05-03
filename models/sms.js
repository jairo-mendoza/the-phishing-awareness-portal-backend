const mongoose = require("mongoose");

const SmsSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: String,
        required: true,
    },
    isPhishing: {
        type: Boolean,
        default: false,
        required: true,
    },
    // Won't be sending difficulty to frontend, will only be used in the backend
    difficulty: {
        type: Number,
        required: true,
        default: 0, // 0 is easiest, 1 is medium, 2 is hardest, 3 is extreme
    },
});

const SMS = mongoose.model("SMS", SmsSchema);

module.exports = SMS;
