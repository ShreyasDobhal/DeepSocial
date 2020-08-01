const express = require('express');
const multer = require('multer');

const router = express.Router();

// const User = require('../models/User');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'./uploads/');
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
    res.json({status:'Running'});
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
    // console.log("File",req.body.files);
    // console.log(req.files[0].path);
    // res.json({status:'Post added'});

    if (req.files && req.files.length>0) {
        console.log(req.files);
        console.log(req.files[0].path);
        res.json({status:'Post added'});
    } else {
        res.json({status:'Post added without images'});

    }
});

module.exports = router;
