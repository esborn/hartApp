export default class Cache {
    constructor($cacheFactory) {
        this.$cacheFactory = $cacheFactory;
    }

    getById(id) {
        const existingCacheForId = this.$cacheFactory.get(id);

        return !existingCacheForId ? this.$cacheFactory(id) : existingCacheForId;
    }
}

Cache.$inject = ["$cacheFactory"];