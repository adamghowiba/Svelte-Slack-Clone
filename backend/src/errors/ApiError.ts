import ICustomError from './ICustomError';

export default class ApiError extends ICustomError {
	isOperational: boolean;

	constructor(message: string, statusCode = 400) {
		super(message, statusCode);

		this.isOperational = true;
	}
}
