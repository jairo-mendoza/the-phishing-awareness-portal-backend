const Email = require("../models/email");

exports.getEmail = (req, res) => {
    let filters = req.query;

    if (Object.keys(filters).length === 0) {
        filters = {};
    }

    Email.find(filters)
        .then((emailArray) => {
            res.status(200).json({ emailData: emailArray });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting email." });
        });
};
