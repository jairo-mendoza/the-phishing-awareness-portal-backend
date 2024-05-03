const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    senderProfile: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
        default: 0, // 0 is easiest, 1 is medium, 2 is hardest, 3 is extreme
    },
    timeStamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isPhishing: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const Email = mongoose.model("Email", EmailSchema);

module.exports = Email;
