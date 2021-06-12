const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const User = require('../../../models/user.js');
const { UserType } = require('../../objectTypes.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUpMutation = {
    type: UserType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args) {
        const password = await bcrypt.hash(args.password, 10)

        const user = new User({
            name: args.name,
            password: password,
            email: args.email
        })

        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        console.log(token)
        return user.save();
    }
}

module.exports = { signUpMutation }