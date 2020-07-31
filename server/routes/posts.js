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

router.post('/add',upload.array('postImage',10),(req,res,next)=>{
    console.log(req.files);
    console.log(req.files[0].path);
    res.json({status:'Post added'});
});

module.exports = router;
