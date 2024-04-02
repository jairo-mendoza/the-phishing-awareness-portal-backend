const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();

        const db = client.db(process.env.DB_NAME);
        const users = db.collection(process.env.USER_COLLECTION);
        await users.insertOne({
            name: "Gary",
            email: "gary@jairo.com",
            password: "12345",
        });

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        await client.close();
    }
}

app.get("/", (req, res) => {
    console.log("Request received...");
    res.send("Hello World!");
    run().catch(console.dir);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
