const Email = require("../models/email");

exports.getEmail = (req, res) => {
    let filters = req.query;

    if (Object.keys(filters).length === 0) {
        filters = {};
    }

    Email.find(filters)
        .then((emailArray) => {
            const responseArray = emailArray.map((email) => ({
                type: "email",
                sender: email.sender,
                senderProfile: email.senderProfile,
                subject: email.subject,
                content: email.content,
                body: email.body,
                timeStamp: email.timeStamp,
                isPhishing: email.isPhishing,
            }));

            res.status(200).json({ emailData: responseArray });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting email." });
        });
};
