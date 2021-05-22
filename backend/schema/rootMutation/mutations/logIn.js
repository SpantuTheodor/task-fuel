const graphql = require("graphql");
const {
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const User = require('../../../models/user.js');
const { AuthenticationType } = require('../../objectTypes.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logInMutation = {
    type: AuthenticationType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args) {
        const user = await User.findOne({
            name: args.name
        })

        if (!user) {
            throw new Error('No user with that name')
        }

        const valid = await bcrypt.compare(args.password, user.password)

        if (!valid) {
            throw new Error('Incorrect password')
        }

        const token = jwt.sign({
            userId: user.id,
            name: args.name,
            password: args.password
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        })

        console.log(token);
        return {userId: user.id, username: args.name, accessToken: token, refreshToken: token}
    }
}

module.exports = { logInMutation }