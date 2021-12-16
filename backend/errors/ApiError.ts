export default class ApiError extends Error {
    message: string;
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 400) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, ApiError);
    }
}