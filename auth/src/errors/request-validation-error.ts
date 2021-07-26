import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]) {
        super('Invalid req parameters');

        // Only becasue we are extending a class(built in)
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param}
        })
    }
}