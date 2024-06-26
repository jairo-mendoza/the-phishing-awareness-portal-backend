const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

const allCommRoutes = require("./routes/allCommRoutes");
const emailRoutes = require("./routes/emailRoutes");
const userRoutes = require("./routes/userRoutes");
const smsRoutes = require("./routes/smsRoutes");
const forumPostRoutes = require("./routes/forumPostRoutes");
const forumPostCommentRoutes = require("./routes/forumPostCommentRoutes");

const app = express();
const port = 9001;

require("dotenv").config();

// Validate environment variables
if (!process.env.URI || !process.env.DB_NAME) process.exit(1);

// Backend will be receiving JSON from front-end, we need to parse these requests
app.use(express.json());
// Cors is needed for requests from the front-end
// TODO: Will need to change origin when deploying
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
// Helmet automatically sets response headers, increases security
app.use(helmet());

app.use("/user", userRoutes);
app.use("/email", emailRoutes);
app.use("/sms", smsRoutes);
app.use("/post", forumPostRoutes);
app.use("/comment", forumPostCommentRoutes);
app.use("/all-comm", allCommRoutes); // Route to get both email and sms

mongoose
    .connect(process.env.URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        console.log(`Connecting to: ${process.env.URI}/${process.env.DB_NAME}`);
        console.log("Connected to Mongodb...");
        app.listen(port); // Only listen to requests after connecting to database
    })
    .catch((err) => {
        console.error("COULD NOT CONNECT TO MONGODB!");
    });
