const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const Task = require('../../../models/task');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const deleteTaskMutation = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args) {

        Task.deleteOne({ '_id': args.id }).then(function(){
            return true
        }).catch(function(error){
            return false
        });
    }
}

module.exports = { deleteTaskMutation}