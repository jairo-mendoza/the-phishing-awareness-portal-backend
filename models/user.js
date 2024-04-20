const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Defining structure of user mongodb document
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Hash user password before user document is saved to database
userSchema.pre("save", async function (next) {
    // Mongoose Document object functions:
    // https://mongoosejs.com/docs/api/document.html#Document.prototype.$isModified()
    // Only hash the password if it is modified or a new user document
    if (this.isModified("password") || this.isNew) {
        const hash = await bcrypt.hash(this.password, saltRounds);
        this.password = hash;
    }

    next();
});

// Method to compare entered password with database password for logins
// userSchema.methods.comparePassword = function (password) {
//     return bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
