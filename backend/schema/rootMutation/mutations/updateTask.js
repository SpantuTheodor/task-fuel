const nodemailer = require("nodemailer")
const graphql = require("graphql")
const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} = graphql

const { GraphQLDateTime } = require('graphql-iso-date')
const _ = require('lodash');

const Task = require('../../../models/task.js')
const LogEntry = require('../../../models/logEntry.js')
const Board = require('../../../models/board.js')
const User = require('../../../models/user.js')

const { TaskType } = require('../../objectTypes.js');

const updateTaskMutation = {
    type: TaskType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        boardId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        startDate: {
            type: GraphQLDateTime
        },
        endDate: {
            type: GraphQLDateTime
        },
        assigneeId: {
            type: GraphQLID
        },
        collaboratorIds: {
            type: new GraphQLList(GraphQLID)
        },
        location: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        resource: {
            type: GraphQLString
        }

    },
    async resolve(parent, args, req) {

        if(!req.isAuthenticated){
            throw new Error('Unauthenticated')
        }
        
        if(args.status){
            let logEntry = new LogEntry({
                method: args.status,
                boardId: args.boardId,
                taskName: args.name,
                date: new Date()
            })

            logEntry.save()

            await Board.updateOne({
                '_id': args.boardId
            }, { $push: {logEntryIds: logEntry.id }}, { upsert: true })
        }

        await Task.findOneAndUpdate({
            '_id': args.id
        }, {$set:
            _.pickBy({
                name: args.name,
                description: args.description,
                startDate: args.startDate,
                endDate: args.endDate,
                assigneeId: args.assigneeId,
                collaboratorIds: args.collaboratorIds,
                location: args.location,
                status: args.status,
                resource: args.resource
            }, _.identity),
        }, {useFindAndModify: false, new:true, select: "assigneeId"}).then((taskRes) => {
    
            if(args.status === "done"){
                User.findById(taskRes.assigneeId).select("name email").then(async (res) => {

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.GMAIL_ADD, 
                            pass: process.env.GMAIL_PWD
                        }
                    });

                    let mailOptions = {
                        from: process.env.GMAIL_ADD, 
                        to: String(res.email),
                        subject: `${args.name} finished | task-fuel`,
                        html: `<p> Hello there, <span style='font-weight:bold;'> ${res.name} </span> </p>
                        <p>You and your team have successfully completed <span style='font-weight:bold;'>${args.name}</span>, congrats! 😁</p>
                        <br>
                        <p> Have a great day, </p>
                        <p style='font-weight:bold;'>task-fuel</p>`
                    };

                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            console.log('Error while sending email');
                        }
                    });
                })
            }
        })
    }
}

module.exports = { updateTaskMutation }