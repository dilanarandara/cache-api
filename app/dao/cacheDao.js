const cacheModel = require('../dao/models/cache');
const logger = require('../util/logger');

class CacheDao {

    /**
     * Get cache by key.
     *
     * @param {String} key - Key of the cache object.
     * @param {Function} callback - Callback function
     * @memberof CacheDao
     */
    getByKey(key, callback) {
        cacheModel.findOne({
            key
        }, callback);
    }

    /**
     * Create a cache record.
     *
     * @param {Object} data - Cache data.
     * @param {Function} callback - Callback function.
     * @memberof CacheDao
     */
    create(data, callback) {
        cacheModel.create(data, callback);
    }

    /**
     * Retrieve all the cached keys.
     * 
     * @param {Function} callback - Callback function.
     * @memberof CacheDao
     */
    getAll(callback) {
        cacheModel.find({}).exec(callback);
    }
}

module.exports = new CacheDao();