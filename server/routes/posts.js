const express = require('express');
const multer = require('multer');

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
router.get('/',(req,res)=>{
    Post.find({})
        .then(posts=>{
            res.json(posts);
        })
        .catch(error=>{
            res.json({status:'Failed',error:error,message:'Failed to load posts'});
        });
});

router.get('/:postId',(req,res)=>{

    Post.findById(req.params.postId)
        .then(post=>{
            res.json(post);
        })
        .catch(error=>{
            res.status(404).json({status:'Failed',error:error,message:'Failed to load post'});
        });
});



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
            res.json({status:'Failed',error:error,message:'Failed to save post'});
        });
});

module.exports = router;
