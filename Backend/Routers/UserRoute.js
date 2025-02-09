const express = require('express');
const router = express.Router();
const {getholdings, allholdings, registerproperty,sellholding} = require('../Controllers/UserControllers');

router.get('/getholdings', getholdings);       

router.get('/allholdings', allholdings);

router.post('/registerproperty', registerproperty);

router.put('/sellholding', sellholding);

module.exports = router;