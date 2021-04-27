const graphql = require("graphql");
const {
    GraphQLSchema
} = graphql;

const RootQuery = require('./rootQuery.js');
const Mutation = require('./mutation.js');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});