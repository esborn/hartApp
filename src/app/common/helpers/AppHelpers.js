export default class AppHelpers {

    static transformResponse(response) {
        try {
            const spData = response.data.d;

            return spData.results ? spData.results : spData;
        }
        catch (e) {
            return response;
        }
    }

    static replaceData(path, replacements) {
        return path.replace(/{\w+}/g, (all) => {
            return replacements[all] !== undefined && replacements[all] !== null ? replacements[all] : all;
        });
    }

    static isEmptyData(response) {
        response = AppHelpers.transformResponse(response);

        if (response == null) {
            return true;
        }

        return response.length == 0;
    }
    
    static pad(source, length, paddingChar) {
        paddingChar = paddingChar || '0';
        
        source = source.toString();
        
        if (source.length >= length)
            return source;
            
        return new Array(length - source.length + 1).join(paddingChar) + source; 
    }

    static get IdFromCurrentDateTime() {
        let currentDate = new Date();

        return currentDate.getFullYear().toString() +
            AppHelpers.pad(currentDate.getMonth() + 1, 2, '0') +
            AppHelpers.pad(currentDate.getDate(), 2, '0') +
            AppHelpers.pad(currentDate.getHours(), 2, '0') +
            AppHelpers.pad(currentDate.getMinutes(), 2, '0') +
            AppHelpers.pad(currentDate.getSeconds(), 2, '0');
    }
}