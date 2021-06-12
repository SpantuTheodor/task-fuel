const graphql = require("graphql");
const { GraphQLID } = graphql;

const LogEntry = require('../../../models/logEntry.js');
const { LogEntryType } = require('../../objectTypes.js');

const logEntryQuery = {
    type: LogEntryType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    resolve(parent, args, req) {
        
        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        return LogEntry.findById(args.id);
    }
}

module.exports = { logEntryQuery }