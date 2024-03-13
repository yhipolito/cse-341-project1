const router = require('express').Router();

// router.get('/', (req, res) => {res.send('Hello Yazel');});

router.use('/users', require('./user.js'));

module.exports = router;