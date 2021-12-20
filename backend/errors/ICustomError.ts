
/**
 * Use to format all Operational error messages sent to the user
 * 
 * @abstract Abstract extension for custom errors
 * @param {string} message Error message to be sent to the user
 * @param {number} [statusCode=400] HTTP Status code
 */

export abstract class ICustomError extends Error {
    abstract isOperational: boolean;
    message: string;
    statusCode: number;
    status: string;

    constructor(message: string, statusCode?: number) {
        super(message);

        this.statusCode = statusCode || 400;
        this.status = `${statusCode}`.startsWith('5') ? 'Fail' : 'Error';
        Error.captureStackTrace(this, (this.constructor as typeof ICustomError));
    }
}

