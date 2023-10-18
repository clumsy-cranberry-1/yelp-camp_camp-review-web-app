const catchAsyncError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => next(error));
    };
};

module.exports = catchAsyncError;

// https://zellwk.com/blog/async-await-express/
// https://www.npmjs.com/package/express-async-handler