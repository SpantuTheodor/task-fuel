const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const {
    graphqlHTTP
} = require("express-graphql");
const schema = require("./schema/schema");
const database = require("./database/database");
const authentication = require("./authentication/authentication")
const jwt = require("express-jwt");

const authMiddleware = jwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
}).unless({path: ['/token']});

const app = express();

app.use(authentication);

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP((req) => ({
        schema,
        graphiql: true
    }))
);

app.listen(4000, () => {
    console.log("Listening on port 4000");
});