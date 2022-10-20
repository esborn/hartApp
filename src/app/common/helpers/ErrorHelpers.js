export default class Errors {
    static getErrorMessage(errorData) {
        let message;

        try {
            message = errorData.data.error.message.value;
        }
        catch (e) {
            message = `An error occured: ${errorData}`;
        }

        return message;
    }
}
