export default class ArrayUtils {
    static add(array, newItem) {
        array.push(newItem);
    }

    static update(array, existingItem, newItem) {
        const index = array.indexOf(existingItem);

        if (index > -1) {
            array[index] = newItem;
        }
    }

    static remove(array, item) {
        const index = array.indexOf(item);

        if (index > -1) {
            array.splice(index, 1);
        }
    }
    
    static contains(array, item) {
        if (!array)
            return false;
        
        const index = array.indexOf(item);
        
        return index > -1;
    }

    static clone(array) {
        return array.slice(0);
    }
}
