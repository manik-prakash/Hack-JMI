const express = require('express');
const router = express.Router();
const {getholdings, allholdings, registerproperty} = require('../Controllers/UserControllers');

router.get('/getholdings', getholdings);       

router.get('/allholdings', allholdings);

router.post('/registerproperty', registerproperty);

module.exports = router;