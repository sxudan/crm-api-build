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
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const admin = yield (0, userController_1.addUser)(body);
        res.status(200).send({ success: true, data: admin });
    }
    catch (e) {
        next(e);
    }
}));
exports.userRoutes.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const admin = yield (0, userController_1.updateUser)(body);
        res.status(200).send({ success: true, data: admin });
    }
    catch (e) {
        next(e);
    }
}));
exports.userRoutes.get("/:branchId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { branchId } = req.params;
        const result = yield (0, userController_1.getAllUsers)(parseInt(branchId));
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.userRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, userController_1.deleteUser)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
