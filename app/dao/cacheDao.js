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
     * Find cache record by key and update.
     * If the cache record not found, then create.
     * 
     * @param {Object} data - Cache record data.
     * @param {Function} callback - Callback function.
     */
    findByKeyAndUpsert(data, callback) {
        cacheModel.findOneAndUpdate({
            key: data.key
        }, {
            key: data.key,
            description: data.description
        }, {
            upsert: true
        }, callback);
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

    /**
     * Delete cache record by key.
     *
     * @param {String} key - Key name.
     * @param {Function} callback - Callback function.
     */
    deleteByKey(key, callback) {
        cacheModel.remove({
            key
        }, callback);
    }

    /**
     * Delete all cache records.
     *
     * @param {Function} callback - Callback function.
     * @memberof CacheDao
     */
    deleteAll(callback) {
        cacheModel.remove({}, callback);
    }
}

module.exports = new CacheDao();