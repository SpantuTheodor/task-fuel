const graphql = require("graphql");
const {
    GraphQLSchema
} = graphql;

const RootQuery = require('./rootQuery/rootQuery.js');
const RootMutation = require('./rootMutation/rootMutation.js');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});