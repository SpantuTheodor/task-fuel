const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const {
    graphqlHTTP
} = require("express-graphql");
const schema = require("./schema/schema.js");
const database = require("./database/database.js");
const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.log("Listening on port 4000");
});