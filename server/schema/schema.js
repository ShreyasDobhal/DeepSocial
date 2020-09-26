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

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        fname: {type: GraphQLString},
        lname: {type: GraphQLString},
        userDP: {type: GraphQLString},
        email: {type: GraphQLString},
        friends: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({friends: parent._id});
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
        id: {type: GraphQLID},
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
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Post.findById(args.id);
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