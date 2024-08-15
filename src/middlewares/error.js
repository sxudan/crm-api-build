"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const exception_1 = require("../models/exception");
const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const code = error.code || exception_1.ErrorCode.UNKNOWN;
    const message = error.message || "Something went wrong.";
    console.log(error);
    return res.status(status).json({
        status: false,
        error: {
            status: status,
            code: code,
            message: message,
        },
    });
};
exports.errorHandler = errorHandler;
