const router = require('express').Router();

// router.get('/', (req, res) => {res.send('Hello Yazel');});

router.use('/contacts', require('./contacts.js'));

module.exports = router;