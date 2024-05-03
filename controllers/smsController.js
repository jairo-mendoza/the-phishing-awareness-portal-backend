const SMS = require("../models/sms");

exports.getSMS = (req, res) => {
    SMS.countDocuments()
        .then((count) => {
            const random = Math.floor(Math.random() * count);

            // Query all sms but only return one random sms
            // skip function skips over the first `random` number of sms
            return SMS.findOne().skip(random).exec();
        })
        .then((result) => {
            // Remember, we are not sending the difficulty to the frontend (Might change later though)
            res.status(200).json({
                smsData: {
                    number: result.number,
                    content: result.content,
                    timeStamp: result.timeStamp,
                    isPhishing: result.isPhishing,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting sms." });
        });
};
