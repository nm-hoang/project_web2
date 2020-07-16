const express = require('express');
const router = express.Router();
const User = require('../services/user');
const asyncHandler = require('express-async-handler');
const Email = require('../services/email');
/*Reset password*/


router.get('/', asyncHandler( async function (req,res,next){
    res.render('transferring_money');
}));



router.post('/',asyncHandler(async function (req,res){
    return res.redirect('confirm_transferring_money');
}));
module.exports = router;