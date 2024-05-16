const SMS = require("../models/sms");

exports.getSMS = (req, res) => {
    // Gets filters from query parameters in the request URL
    let filters = req.query;

    // If no filters are provided, default to an empty object
    // TODO: Getting all SMS for now, will limit soon
    if (Object.keys(filters).length === 0) {
        filters = {};
    }

    SMS.find(filters)
        .then((smsArray) => {
            const responseArray = smsArray.map((sms) => ({
                number: sms.number,
                content: sms.content,
                timeStamp: sms.timeStamp,
                isPhishing: sms.isPhishing,
            }));

            res.status(200).json({ smsData: responseArray });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting sms." });
        });
};
