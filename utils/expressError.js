class ExpressError extends Error {
    constructor(statusCode = 500, message = "Something went wrong") {
        super(message); // Pass message to base Error constructor
        this.statusCode = statusCode;
        this.name = "ExpressError";
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;
