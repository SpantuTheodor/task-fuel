const graphql = require("graphql");
const {
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const Task = require('../../../models/task');

const updateTaskListMutation = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        taskIds: {
            type: new GraphQLNonNull(new GraphQLList(GraphQLID))
        }
    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        console.log(args.id, args.taskIds)
        args.taskIds.map( async(taskId, index) => {
            await Task.findOneAndUpdate({'_id': taskId}, {'order': index}, {useFindAndModify: false})
        })
        return true
    }
}

module.exports = { updateTaskListMutation}