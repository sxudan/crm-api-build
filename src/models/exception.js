"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorException = exports.NotFoundException = exports.InvalidFieldValueException = exports.ForbiddenException = exports.DisabledException = exports.AuthException = exports.HttpException = exports.ErrorCode = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["NOT_FOUND"] = "NOT_FOUND";
    ErrorCode["INVALID_DATA"] = "INVALID_DATA";
    ErrorCode["INVALID_CREDENTIALS"] = "INVALID_CRED";
    ErrorCode["UNAUTHORISED"] = "UNAUTHORISED";
    ErrorCode["FORBIDDEN"] = "FORBIDDEN";
    ErrorCode["UNKNOWN"] = "UNKNOWN";
    ErrorCode["CODE_EXPIRED"] = "CODE_EXPIRED";
    ErrorCode["CONNECTION_EXISTS"] = "CONNECTION_EXISTS";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class HttpException extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class AuthException extends HttpException {
    constructor(args) {
        var _a, _b;
        super(HttpStatusCode.UNAUTHORIZED, (_a = args === null || args === void 0 ? void 0 : args.code) !== null && _a !== void 0 ? _a : ErrorCode.UNAUTHORISED, (_b = args === null || args === void 0 ? void 0 : args.message) !== null && _b !== void 0 ? _b : "Unauthorised.");
    }
}
exports.AuthException = AuthException;
class DisabledException extends HttpException {
    constructor(args) {
        var _a, _b;
        super(HttpStatusCode.UNAUTHORIZED, (_a = args === null || args === void 0 ? void 0 : args.code) !== null && _a !== void 0 ? _a : ErrorCode.UNAUTHORISED, (_b = args === null || args === void 0 ? void 0 : args.message) !== null && _b !== void 0 ? _b : "Unauthorised.");
    }
}
exports.DisabledException = DisabledException;
class ForbiddenException extends HttpException {
    constructor(args) {
        var _a, _b;
        super(HttpStatusCode.FORBIDDEN, (_a = args === null || args === void 0 ? void 0 : args.code) !== null && _a !== void 0 ? _a : ErrorCode.FORBIDDEN, (_b = args === null || args === void 0 ? void 0 : args.message) !== null && _b !== void 0 ? _b : "Forbidden.");
    }
}
exports.ForbiddenException = ForbiddenException;
class InvalidFieldValueException extends HttpException {
    constructor(fields, args) {
        var _a, _b;
        super(HttpStatusCode.BAD_REQUEST, (_a = args === null || args === void 0 ? void 0 : args.code) !== null && _a !== void 0 ? _a : ErrorCode.INVALID_DATA, (_b = args === null || args === void 0 ? void 0 : args.message) !== null && _b !== void 0 ? _b : `Invalid value for the following field(s): ${fields.join(", ")}.`);
    }
}
exports.InvalidFieldValueException = InvalidFieldValueException;
class NotFoundException extends HttpException {
    constructor(args) {
        var _a, _b;
        super(HttpStatusCode.NOT_FOUND, (_a = args === null || args === void 0 ? void 0 : args.code) !== null && _a !== void 0 ? _a : ErrorCode.NOT_FOUND, (_b = args === null || args === void 0 ? void 0 : args.message) !== null && _b !== void 0 ? _b : "Not found.");
    }
}
exports.NotFoundException = NotFoundException;
class InternalErrorException extends HttpException {
    constructor(args) {
        var _a, _b;
        super(HttpStatusCode.INTERNAL_SERVER_ERROR, (_a = args === null || args === void 0 ? void 0 : args.code) !== null && _a !== void 0 ? _a : ErrorCode.UNKNOWN, (_b = args === null || args === void 0 ? void 0 : args.message) !== null && _b !== void 0 ? _b : "Internal server error.");
    }
}
exports.InternalErrorException = InternalErrorException;
