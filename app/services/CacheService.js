const _ = require('lodash');

const cacheDao = require('../dao/cacheDao');
const logger = require('../util/logger');

class CacheService {
    /**
     * Get cache by key.
     *
     * @param {String} key - Key of the cache object.
     * @param {Function} callback - Callback function
     * @memberof CacheDao
     */
    getByKey(key, callback) {
        cacheDao.getByKey(key, callback);
    }

    /**
     * Create a cache record.
     *
     * @param {Object} data - Cache data.
     * @param {Function} callback - Callback function.
     * @memberof CacheDao
     */
    create(data, callback) {
        cacheDao.create(data, callback);
    }

    /**
     * Get cache record by key.
     * If the key not found,
     * then create a cache record with the key.
     *
     * @param {String} key - Cache Key.
     * @param {Function} callback - Callback function.
     * @memberof CacheService
     */
    getByKeyOrInsert(key, callback) {
        const self = this;

        self.getByKey(key, (err, cacheObj) => {
            if (err) {
                logger.error(`Error occured in get cache by key : ${JSON.stringify(err)}`);
                return callback(err);
            }

            if (cacheObj) {
                logger.info(`Cache hit`);
                return callback(null, {
                    key: cacheObj.key,
                    description: cacheObj.description
                });
            } else {
                logger.warn(`Cache miss`);
                
                // Random description
                let description = Math.random().toString(36).substring(2, 15);
                
                self.create({key, description}, (err, cacheObj) => {
                    if (err) {
                        return callback(err);
                    }

                    return callback(null, {key, description});
                });
            }
        })
    }

    /**
     * Retrieve all the cached keys.
     * 
     * @memberof CacheDao
     */
    getAllKeys(callback) {
        cacheDao.getAll((err, result) => {
            if (err) {
                return callback(err);
            }

            const keyList = result.map(cache => cache.key);
            callback(null, keyList);
        });
    }

    /**
     * Find cache record by key and update.
     * If the cache record not found, then create.
     * 
     * @param {Object} data - Cache record data.
     * @param {Function} callback - Callback function.
     */
    findByKeyAndUpsert(data, callback) {
        cacheDao.findByKeyAndUpsert(data, callback);
    }

    /**
     * Delete cache record by key.
     *
     * @param {String} key - Key name.
     * @param {Function} callback - Callback function.
     */
    deleteByKey(key, callback) {
        cacheDao.deleteByKey(key, callback);
    }

    /**
     * Delete all cache records.
     *
     * @param {Function} callback - Callback function.
     * @memberof CacheDao
     */
    deleteAll(callback) {
        cacheDao.deleteAll(callback);
    }
}

module.exports = new CacheService();