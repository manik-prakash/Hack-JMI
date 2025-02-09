const express = require('express');
const router = express.Router();
const {signup,login ,validateAuth} = require('../Controllers/AuthControllers');

router.post('/signup', signup);
router.get('/validate',validateAuth);  //validate the token
router.post('/login', login);

module.exports = router;

