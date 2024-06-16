"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const exception_1 = require("../models/exception");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password, userType } = req.body;
    try {
        const data = yield (0, authController_1.login)({ email, password, userType });
        res.status(200).json({ success: true, data: data });
    }
    catch (e) {
        next(new exception_1.AuthException({ message: (_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : "Login Error" }));
    }
}));
exports.authRoutes.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield (0, authController_1.signup)(body);
        res.status(200).json({ success: true, data: data });
    }
    catch (e) {
        next(e);
    }
}));
