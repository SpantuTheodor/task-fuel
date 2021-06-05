const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const TaskList = require('../../../models/taskList');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const deleteTaskListMutation = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args) {

        TaskList.deleteOne({ '_id': args.id }).then(function(){
            return true
        }).catch(function(error){
            return false
        });
    }
}

module.exports = { deleteTaskListMutation}