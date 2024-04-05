const { DUPLICATE_KEY_ERROR } = require("../constants/errorCodes");
const User = require("../models/user");

exports.registerUser = (req, res) => {
    if (!req.body.userName || !req.body.password) {
        return res.status(400).json({ message: "Missing fields." });
    }

    const user = new User(req.body);

    user.save()
        .then((result) => {
            // Sends result as JSON response
            res.status(201).json({
                message: "User created successfully",
                user: user,
            });
        })
        .catch((err) => {
            if (err.code === DUPLICATE_KEY_ERROR) {
                res.status(400).json({
                    message: "Username or email already exists.",
                });
            } else {
                res.status(500).json({ message: "Error creating user." });
            }
        });
};
