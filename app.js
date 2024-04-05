const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 9001;

require("dotenv").config();

// Backend will be receiving JSON from front-end, we need to parse these requests
app.use(express.json());
// Cors is needed for requests from the front-end
app.use(cors());

app.use("/user", userRoutes);

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
        console.log("Oh noes!");
    });
