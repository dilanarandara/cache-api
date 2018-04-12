const express = require('express');
const router = express.Router();
const logger = require('../app/util/logger');
const httpStatus = require('../app/util/HttpStatusCode');
const cacheService = require('../app/services/CacheService');

// Get cache record by key.
router.get('/:key', (req, res) => {

    let key = req.params.key;

    cacheService.getByKeyOrInsert(key, (err, obj) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.send({error: 'Innternal Server Error'});
        } else {
            res.status(httpStatus.SUCCESS);
            res.send(obj);
        }
    });
});

router.get('/', (req, res) => {
    cacheService.getAllKeys((err, result) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.send({error: 'Innternal Server Error'});
        } else {
            res.status(httpStatus.SUCCESS);
            res.send(result);
        }
    })
});

module.exports = router;