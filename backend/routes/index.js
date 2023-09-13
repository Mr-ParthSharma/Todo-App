const express = require('express');
const { signup, findUser } = require('../controllers/signup');

const router = express.Router();


router.get('/signup', findUser);
router.post('/signup', signup); 


module.exports = router;
