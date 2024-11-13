class CustomException extends Error {
    status: number;
    title: string;
    message: string;
    constructor(status: number, title: string, message?: string) {
        super(message);
        this.status = status;
        this.title = title;
        this.message = message ? message : title;
    }
}

export default CustomException;