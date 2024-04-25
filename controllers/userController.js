const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { DUPLICATE_KEY_ERROR } = require("../constants/errorCodes");
const User = require("../models/user");

// Handle user registration
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

// Handle user login
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    console.log(`Trying to log in user: ${email}`);

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Check if entered password matches hashed password in database
            bcrypt.compare(password, user.password).then((doMatch) => {
                if (doMatch) {
                    // Sign a token, payload first, then secret, then options
                    const token = jwt.sign(
                        { id: user._id, userName: user.userName },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );
                    res.status(200).json({
                        token,
                        user: {
                            id: user._id,
                            userName: user.userName,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                    });
                } else {
                    res.status(401).json({ message: "Invalid password." });
                }
            });
        })
        .catch((err) => next(err)); // TODO: Define error handling middleware
};

/* Testing these methods */
// TODO: Move these methods to a separate file
const extractToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403).json({ message: "Token not provided." });
    }
};

const verifyToken = (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403).json({ message: "Invalid token." });
        } else {
            req.userId = authData.id;
            next();
        }
    });
};

// Chaining together middleware functions
exports.getUser = [
    extractToken,
    verifyToken,
    (req, res) => {
        console.log(`Fetching user with id: ${req.userId}...`);
        User.findById(req.userId)
            .then((user) => {
                res.status(200).json({
                    userName: user.userName,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                });
            })
            .catch((err) => {
                res.status(500).json({ message: "Error fetching user." });
            });
    },
];
