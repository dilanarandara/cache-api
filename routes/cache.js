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

router.put('/:key', (req, res) => {
    const key = req.params.key,
        description = req.body.description;

    if (!description) {
        res.status(httpStatus.BAD_REQUEST).send();
        return;
    }

    cacheService.findByKeyAndUpsert({
        key,
        description
    }, (err, result) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.send({error: 'Innternal Server Error'});
        } else {
            res.status(httpStatus.CREATED);
            res.send({key, description});
        }
    });
});

router.delete('/:key', (req, res) => {
    const key = req.params.key;

    cacheService.deleteByKey(key, (err, result) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.send({error: 'Innternal Server Error'});
        } else {
            res.status(httpStatus.SUCCESS).send();
        }
    })
});

router.delete('/', (req, res) => {
    cacheService.deleteAll((err, result) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR)
            res.send({error: 'Innternal Server Error'});
        } else {
            res.status(httpStatus.SUCCESS).send();
        }
    })
});

module.exports = router;