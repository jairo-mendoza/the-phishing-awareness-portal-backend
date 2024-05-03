const Email = require("../models/email");

exports.getEmail = (req, res) => {
    Email.countDocuments()
        .then((count) => {
            const random = Math.floor(Math.random() * count);

            // Query all emails but only return one random email
            // skip function skips over the first `random` number of emails
            return Email.findOne().skip(random).exec();
        })
        .then((result) => {
            res.status(200).json({ emailData: result });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting email." });
        });
};
