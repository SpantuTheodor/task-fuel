const graphql = require("graphql");
const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;

const Board = require('../../../models/board');
const { BoardType } = require('../../objectTypes');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const deleteBoardMutation = {
    type: GraphQLBoolean,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args) {

        Board.deleteOne({ '_id': args.id }).then(function(){
            return true
        }).catch(function(error){
            return false
        });
    }
}

module.exports = { deleteBoardMutation}