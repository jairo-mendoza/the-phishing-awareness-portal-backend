/* Controller to get both emails and sms */
const Email = require("../models/email");
const SMS = require("../models/sms");

exports.getAllComm = (req, res) => {
    let filters = req.query;

    if (Object.keys(filters).length === 0) {
        filters = {};
    }

    Promise.all([
        Email.find(filters).limit(5).exec(),
        SMS.find(filters).limit(5).exec(),
    ])
        .then(([emailArray, smsArray]) => {
            emailArray = emailArray.map((email) => ({
                type: "email",
                sender: email.sender,
                senderProfile: email.senderProfile,
                subject: email.subject,
                content: email.content,
                body: email.body,
                timeStamp: email.timeStamp,
                isPhishing: email.isPhishing,
            }));

            smsArray = smsArray.map((sms) => ({
                type: "sms",
                number: sms.number,
                content: sms.content,
                timeStamp: sms.timeStamp,
                isPhishing: sms.isPhishing,
            }));

            let allCommData = emailArray.concat(smsArray);

            // Shuffle array
            for (let i = allCommData.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allCommData[i], allCommData[j]] = [
                    allCommData[j],
                    allCommData[i],
                ];
            }

            res.status(200).json({ data: allCommData });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting all comms." });
        });
};
