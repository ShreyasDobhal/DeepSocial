const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');

const router = express.Router();

const Post = require('../models/Post');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'../client/public/uploads/');
    },
    filename: function(req,file,cb) {
        cb(null,new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req,file,cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null,true);
    } else {
        console.log('Mime not allowed : ',file.mimetype);
        cb(null,false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});


// END PONTS

/**
 * GET all posts
 */
router.get('/',(req,res)=>{
    Post.aggregate([
        {
            $lookup: {
                from: 'users',
                let: {authorId: '$authorId'},
                pipeline: [
                    {$match: {$expr : {$eq: ['$$authorId','$_id']}}},
                    {$project: {userDP:1, _id:0}}
                ],
                as:'authorCurrentDP',
            }
        },
        {
            $unwind: {
                path: '$authorCurrentDP', 
                preserveNullAndEmptyArrays: true
            }
        },
        {$sort: {postDate: -1}}
    ]).exec((err, posts) => {
        if (err) {
            res.status(400).json({status:'Failed',error:err,message:'Failed to load posts'});
        } else {
            res.json(posts);
        }
    });
});

/**
 * GET post with given postId
 */
router.get('/:postId',(req,res)=>{

    // Post.findById(req.params.postId)
    //     .then(post=>{
    //         res.json(post);
    //     })
    //     .catch(error=>{
    //         res.status(404).json({status:'Failed',error:error,message:'Failed to load post'});
    //     });
    // return;
    // let postId = `ObjectId(${req.params.postId})`
    let postId = mongoose.Types.ObjectId(req.params.postId);
    Post.aggregate([
        {$match: {_id: postId}},
        {
            $lookup: {
                from: 'users',
                let: {authorId: '$authorId', postId: '$_id'},
                pipeline: [
                    {$match: {$expr : {$eq: ['$$authorId','$_id']}}},
                    {$project: {userDP:1, _id:0}}
                ],
                as:'authorCurrentDP',
            }
        },
        {
            $unwind: {
                path: '$authorCurrentDP', 
                preserveNullAndEmptyArrays: true
            }
        }
    ]).exec((err, posts) => {
        if (err) {
            res.status(400).json({status:'Failed',error:err,message:'Failed to load posts'});
        } else {
            res.json(posts[0]);
        }
    });
});




/**
 * POST method to add a new post
 * payload -
 * postBody
 * postDate
 * postImage
 * authorName
 * tokenId
 * authorDP
 */
// router.post('/add',upload.array('postImages',10),(req,res,next)=>{
// router.post('/add',(req,res,next)=>{
router.post('/add',upload.single('postImage'),(req,res,next)=>{
    console.log("Files",req.files);
    console.log("File",req.file);
    console.log("Body",req.body);
    console.log("Data",req.data);
    console.log("value",req.value);
    console.log("Header",req.header);
    console.log("Headers",req.headers);

    const newPost = new Post({
        postBody: req.body.postBody,
        postDate: req.body.postDate,
        authorName: req.body.authorName,
        authorId: req.body.tokenId,
        authorDP: req.body.authorDP,
        likes: 0,
        dislikes: 0,
        commentCount: 0
    });

    if (req.files) {
        newPost.postImages = req.files.map(file=>file.path.slice(file.path.indexOf('uploads')));
    } else if (req.file) {
        newPost.postImages = [req.file.path.slice(req.file.path.indexOf('uploads'))];
    }

    newPost.save()
        .then(data=>{
            res.json(data);
        })
        .catch(error=>{
            res.status(400).json({status:'Failed',error:error,message:'Failed to save post'});
        });
});

/**
 * POST method to add a comment
 * payload - 
 * commentTo - if undefined adds a comment to post, else adds as a reply to particular comment
 * userId
 * userDP
 * userName
 * commentBody
 * commentDate
 */
router.post('/comment-add',(req,res)=>{
    
    console.log("User Id",req.body.userId);
    console.log("User DP",req.body.userDP);
    console.log("User Name",req.body.userName);
    console.log("Post Id",req.body.postId);
    console.log("Comment body",req.body.commentBody);
    console.log("Comment date",req.body.commentDate);
    console.log("Comment To",req.body.commentTo);

    if (req.body.commentTo) {
        // Replying to a comment
        const comment = {
            userId: req.body.userId,
            userDP: req.body.userDP,
            userName: req.body.userName,
            commentBody: req.body.commentBody,
            commentDate: req.body.commentDate
        };

        Post.updateOne({_id:req.body.postId,'comments._id':req.body.commentTo},
                       {$push : {'comments.$.replies': comment}, $inc : {commentCount:1}})
            .then(doc=>{
                console.log(doc);
                res.json({status:'Comment added'});
            })
            .catch(error=>{
                res.status(400).json({status:'Failed',error:error,message:'Failed to add comment'})
            });


    } else {
        // Commenting on a post
        const comment = {
            userId: req.body.userId,
            userDP: req.body.userDP,
            userName: req.body.userName,
            commentBody: req.body.commentBody,
            commentDate: req.body.commentDate
        };

        Post.findByIdAndUpdate(req.body.postId, 
                              {$push: {comments: comment}, $inc : {commentCount:1}})
            .then(doc=>{
                console.log("Document",doc);
                res.json({status:'Comment added'});
            })
            .catch(error=>{
                res.status(400).json({status:'Failed',error:error,message:'Failed to add comment'})
            });
    }


});

/**
 * POST method to like a post
 * payload - 
 * postId
 * userId
 */
router.post('/post-like', (req, res) => {
    Post.findOne({_id:req.body.postId})
        .then(post=>{
            if (post.dislikedBy.includes(req.body.userId)) {
                Post.updateOne({_id:req.body.postId},
                               {$inc : {dislikes:-1, likes:1},
                                $push : {likedBy:req.body.userId},
                                $pull : {dislikedBy:req.body.userId}})
                    .then(post=>{
                        console.log("Sending payload",post);
                        res.json({status : 'Post liked successfully', data : {_id:req.body.postId, like:1, dislike:-1}});
                    })
                    .catch(error=>{
                        res.status(400).json({status:'Failed',error:error,message:'Failed to like Post'});
                    });
            } else if (post.likedBy.includes(req.body.userId)) {
                res.json({status:'Post already liked by user', data : {_id:req.body.postId, like:0, dislike:0}});
            } else {
                Post.updateOne({_id:req.body.postId},
                               {$inc : {likes:1}, 
                                $push : {likedBy: req.body.userId}})
                    .then(post=> {
                        console.log("Sending payload",post);
                        res.json({status: "Post liked successfully", data : {_id:req.body.postId, like:1, dislike:0}});
                    })
                    .catch(err=>{
                        res.status(400).json({status:'Failed',error:error,message:'Failed to like Post'});
                    })
            }
        })
        .catch(error=>{
            res.status(400).json({status:'Failed',error:error,message:'Failed to like Post'});
        });
    
});

/**
 * POST method to dislike a post
 * payload - 
 * postId
 * userId
 */
router.post('/post-dislike', (req, res) => {
    Post.findOne({_id:req.body.postId})
        .then(post=>{
            console.log("Post found");
            if (post.likedBy.includes(req.body.userId)) {
                console.log("Name in liked list");
                Post.updateOne({_id:req.body.postId},
                               {$inc : {dislikes:1, likes:-1},
                                $pull : {likedBy:req.body.userId},
                                $push : {dislikedBy:req.body.userId}})
                    .then(post=>{
                        console.log("Post disliked");
                        res.json({status : 'Post disliked successfully', data : {_id:req.body.postId, like:-1, dislike:1}});
                    })
                    .catch(error=>{
                        console.log("Post not disliked");
                        console.log(error);
                        res.status(400).json({status:'Failed',error:error,message:'Failed to dislike Post'});
                    });
            } else if (post.dislikedBy.includes(req.body.userId)) {
                res.json({status:'Post already disliked by user', data : {_id:req.body.postId, like:0, dislike:0}});
            } else {
                console.log("Name not in any list");
                Post.updateOne({_id:req.body.postId},
                               {$inc : {dislikes:1}, 
                                $push : {dislikedBy: req.body.userId}})
                    .then(post=> {
                        res.json({status: "Post disliked successfully", data : {_id:req.body.postId, like:0, dislike:1}});
                    })
                    .catch(err=>{
                        res.status(400).json({status:'Failed',error:error,message:'Failed to dislike Post'});
                    })
            }
        })
        .catch(error=>{
            res.status(400).json({status:'Failed',error:error,message:'Failed to dislike Post'});
        });
    
});

module.exports = router;