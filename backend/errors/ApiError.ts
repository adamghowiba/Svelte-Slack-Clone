import { ICustomError } from "./IApiError";

export default class ApiError extends ICustomError {
    message: string;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number = 400) {
        super(message, statusCode);

        this.isOperational = true;
    }
}

export class MissingParam extends ApiError {
    constructor(param: string) {
        super(`Query paramter ${param} is missing from request.`)
    }
}