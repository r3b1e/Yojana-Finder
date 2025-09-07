const express = require('express');
const router = express.Router(); 
const {signin, register, logout} = require('../controllers/authControllers')


router.post("/signin", signin);
router.post("/signup", register);
router.post("/logout", logout);


module.exports = router;