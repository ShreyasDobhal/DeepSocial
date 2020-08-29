const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const router = express.Router();
const User = require('../models/User');

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
 * POST method to add a new image
 * payload -
 * userId
 * userImage
 */
router.post('/add-image',upload.single('userImage'),(req,res,next)=>{
    
    let images = []
    if (req.files) {
        console.log("Images received");
        images = req.files.map(file=>file.path.slice(file.path.indexOf('uploads')));
    } else if (req.file) {
        console.log("Image received");
        images = [req.file.path.slice(req.file.path.indexOf('uploads'))];
    } else {
        console.log("No image received");
    }

    User.updateOne({_id:req.body.userId},{$push: {userImages: {$each: images}}})
        .then(doc => {
            res.json(doc);
        })
        .catch(error => {
            res.status(400).json({status:'Failed',error:error,message:'Failed to upload image/s'});
        });

    // const payload = new Post({
    //     postBody: req.body.postBody,
    //     postDate: req.body.postDate,
    //     authorName: req.body.authorName,
    //     authorId: req.body.tokenId,
    //     authorDP: req.body.authorDP,
    //     likes: 0,
    //     dislikes: 0,
    //     commentCount: 0
    // });

    

    // newPost.save()
    //     .then(data=>{
    //         res.json(data);
    //     })
    //     .catch(error=>{
    //         res.status(400).json({status:'Failed',error:error,message:'Failed to save post'});
    //     });
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
               return res.status(400).json({success:false,error:'Email address already exists'});
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
               return res.status(404).json({error:"No such user found"});
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
                                email: user.email
                            }});
                        
                    } else {
                        res.status(400).json({success:false,error:'Password incorrect'});
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
