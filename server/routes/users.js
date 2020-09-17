const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

const userToken = require('../authentication/userToken');


const secret = 'the secret key';

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
        // fileSize: maxSize
    },
    fileFilter: fileFilter
});


// END PONTS

/**
 * GET all users
 */
router.get('/',(req,res)=>{
    User.find({})
        .then(users=>{
            res.json(users);
        })
        .catch(error=>{
            res.json({status:'Failed',error:error,message:'Failed to load users'});
        });
});

/**
 * GET user with given userId
 */
router.get('/:userId',(req,res)=>{
    User.findById(req.params.userId)
        .then(user=>{
            res.json(user);
        })
        .catch(error=>{
            res.status(404).json({status:'Failed',error:error,message:'Failed to load users'});
        });
});

/**
 * GET all photos of given user
 */
router.get('/:userId/photos', (req, res) => {
    Post.aggregate([
        {
            $match: {
                authorId: mongoose.Types.ObjectId(req.params.userId)
            }
        },
        {
            $project: {
                _id: 0,
                postImages: 1
            }
        },
        {
            $unwind: '$postImages'
        }
    ]).exec((err, posts) => {
        if (err) {
            res.status(400).json({status:'Failed',error:err,message:'Failed to load photos'});
        } else {
            res.json(posts);
        }
    });
});

// /**
//  * POST method to add a new image
//  * payload -
//  * userId
//  * userImage
//  */
// router.post('/add-image',upload.single('userImage'),(req,res,next)=>{
    
//     let images = []
//     if (req.files) {
//         console.log("Images received");
//         images = req.files.map(file=>file.path.slice(file.path.indexOf('uploads')));
//     } else if (req.file) {
//         console.log("Image received");
//         images = [req.file.path.slice(req.file.path.indexOf('uploads'))];
//     } else {
//         console.log("No image received");
//     }

//     User.updateOne({_id:req.body.userId},{$push: {userImages: {$each: images}}})
//         .then(doc => {
//             res.json(doc);
//         })
//         .catch(error => {
//             res.status(400).json({status:'Failed',error:error,message:'Failed to upload image/s'});
//         });
// });

/**
 * POST method to upload a DP
 * payload -
 * userId
 * userImage
 */
router.post('/set-userdp',upload.single('userImage'),(req,res,next)=>{
    
    let image = null;
    if (req.files && req.files.length > 0) {
        console.log("Images received");
        image = req.files[0].path.slice(file.path.indexOf('uploads'));
    } else if (req.file) {
        console.log("Image received");
        image = req.file.path.slice(req.file.path.indexOf('uploads'));
    } else {
        console.log("No image received");
        res.status(400).json({status:'Failed',message:'No image uploaded'});
        return;
    }

    User.updateOne({_id:req.body.userId},{$set: {userDP: image}})
        .then(doc => {
            res.json(doc);
        })
        .catch(error => {
            res.status(400).json({status:'Failed',error:error,message:'Failed to upload image'});
        });
});

/**
 * POST method to add info about user
 * payload -
 * userId
 * location
 * phone
 * work
 * about
 * education
 * birthday
 */
router.post('/add-info', (req, res) => {
    const info = {
        location: req.body.location,
        phone: req.body.phone,
        work: req.body.work,
        about: req.body.about,
        education: req.body.education,
        birthday: req.body.birthday
    }
    User.findByIdAndUpdate(req.body.userId, {$set : {info: info}})
        .then(doc => {
            console.log(doc);
            res.json({message: 'User info updated'});
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({status: 'Failed', message: 'Failed to update user info', error: error});
        })
});

// Sign-up (with token)
router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
               return res.status(400).json({error:'Email address already exists'});
            } else {
                const newUser = new User({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) 
                        throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err)
                            throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => res.status(400).json(err));
                    });
                });
            }
        });
});

// Sign-in (with token)
router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;   
    User.findOne({ email })
        .then(user => {
            if (!user) {
               return res.status(404).json({error:"No such user found"});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user._id,
                            name: user.userName
                        };
                        jwt.sign(payload, secret, { expiresIn: 36000 },(err, token) => {
                            if (err) 
                                res.status(500).json({
                                    error: "Error signing token",
                                    raw: err
                                });
                            userToken[user._id] = `Bearer ${token}`;
                            console.log("USER TOKEN : ",userToken);
                            res.json({ 
                                success: true,
                                token: `Bearer ${token}`
                            });
                        });      
                    } else {
                        res.status(400).json({error:'Password incorrect'});
                    }
                });
        });
});


// Sign-up
router.post('/signup', (req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
               return res.status(400).json({success:false,message:'Email address already exists'});
            } else {
                const newUser = new User({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) 
                        throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err)
                            throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => res.status(400).json({success:false,error:err}));
                    });
                });
            }
        });
});

// Sign-in
router.post('/signin', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
               return res.status(404).json({message:"No such user found"});
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    console.log(user);
                    if (isMatch) {
                        res.json({
                            succes:true,
                            "_id":user._id,
                            user:{
                                fname: user.fname,
                                lname: user.lname,
                                email: user.email,
                                userDP: user.userDP
                            }});
                        
                    } else {
                        res.status(400).json({success:false,message:'Password incorrect'});
                    }
                });
        });
});


router.post('/data', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.json({success:"Protected data received"});
});

router.post('/getdata',(req,res)=>{
    User.findById(req.body._id)
        .then(user=>{
            if (user) {
                res.json({success:true,data:"Authentication worked"});
            } else {
                res.json({succes:false,error:"Authentication failed"});
            }
        })
        .catch(error=>{
            res.json({succes:false,error:error});
        })
});


module.exports = router;
