const graphql = require('graphql');
const _ = require('lodash');

const User = require('../models/User');
const Post = require('../models/Post');

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const InfoType = new GraphQLObjectType({
    name: 'Info',
    fields: () => ({
        location: {type: GraphQLString},
        phone: {type: GraphQLString},
        work: {type: GraphQLString},
        about: {type: GraphQLString},
        education: {type: GraphQLString},
        birthday: {type: GraphQLString}
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLID},
        fname: {type: GraphQLString},
        lname: {type: GraphQLString},
        userDP: {type: GraphQLString},
        email: {type: GraphQLString},
        info: {
            location: {type: GraphQLString},
            phone: {type: GraphQLString},
            work: {type: GraphQLString},
            about: {type: GraphQLString},
            education: {type: GraphQLString},
            birthday: {type: GraphQLString}
        },
        info: {type: InfoType},
        friends: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({friends: parent._id});
            }
        },
        friendRequests: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({_id: {$in: parent.friendRequests}});
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({authorId: parent._id}).sort({postDate: -1});
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: {type: GraphQLID},
        postBody: {type: GraphQLString},
        postImages: {type: new GraphQLList(GraphQLString)},
        postDate: {type: GraphQLString},
        likes: {type: GraphQLInt},
        dislikes: {type: GraphQLInt},
        commentCount: {type: GraphQLInt},
        authorName: {type: GraphQLString},
        authorId: {type: GraphQLID},
        author: {
            type: UserType,
            resolve(parent, args) {
                return User.findOne({_id: parent.authorId});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args._id);
            }
        },
        post: {
            type: PostType,
            args: {_id: {type: GraphQLID}},
            resolve(parent, args) {
                return Post.findById(args._id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});