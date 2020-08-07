const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    postBody: {
        type:String
    },
    postImages: [
        {type: String}
    ],
    postDate: Date,
    authorName: {
        type: String,
        required: true 
    },
    authorDP: String,
    authorId: String,
    tags: [
        mongoose.Schema.Types.String
    ],
    likes: Number,
    dislikes: Number,
    commentCount: Number,
    comments: [
        {
            userName: String,
            userDP: String,
            userId: String,
            commentDate: Date,
            commentBody: String,
            commentTo: String
        }
    ]
});

module.exports = Post = mongoose.model('Post',PostSchema);

// db.posts.update(
//     {authorName: 'Shreyas Dobhal'},
//     {
//         $push: {
//             comments:{
//                 userName:'Shreya Dobhal',
//                 userId:'5f1141951df77916356eb866',
//                 commentDate:ISODate("2020-08-03T16:33:49Z"),
//                 commentBody:"Ohhh! That's so amazying"
//             }
//         }
//     }
// )