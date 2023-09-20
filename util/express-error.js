class expressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = expressError;

// https://zellwk.com/blog/express-errors/
// https://www.npmjs.com/package/http-errors
