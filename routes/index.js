const express = require('express');
const router = express.Router();

// Index router to send a default response.
router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;