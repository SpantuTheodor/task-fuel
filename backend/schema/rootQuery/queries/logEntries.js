
const graphql = require("graphql");
const { GraphQLList } = graphql;


const LogEntry = require('../../../models/logEntry.js');
const { LogEntryType } = require('../../objectTypes.js');

const logEntriesQuery = {
    type: new GraphQLList(LogEntryType),
    resolve(parent, args, req) {
        
        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }

        return LogEntry.find({});
    }
}

module.exports = { logEntriesQuery }