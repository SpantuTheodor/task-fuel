const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLList,
} = graphql;

const LogEntry = require('../../../models/logEntry.js');
const { LogEntryType } = require('../../objectTypes.js');

const logEntriesByBoardIdQuery = {
    type: new GraphQLList(LogEntryType),
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args, req) {
        
        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        return LogEntry.find({'boardId': args.id});            
    }
}

module.exports = { logEntriesByBoardIdQuery }