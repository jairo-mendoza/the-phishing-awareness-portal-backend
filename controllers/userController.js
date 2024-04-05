const User = require("../models/user");

exports.registerUser = (req, res) => {
    const user = new User(req.body);

    console.log("New user request received");

    user.save()
        .then((result) => {
            // Sends result as JSON response
            res.status(201).json({
                message: "User created successfully",
                user: user,
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
};
