const express = require('express');
const router = express.Router();

// END PONTS
router.get('/',(req,res)=>{
    res.json({status:'Running'});
});

module.exports = router;
