const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Fix: Change '/api-docs' to '/' because the prefix is already in index.js
router.use('/', swaggerUi.serve); 
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
