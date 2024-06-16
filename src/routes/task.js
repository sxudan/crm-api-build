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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const auth_1 = __importDefault(require("../middlewares/auth"));
const access_1 = __importDefault(require("../middlewares/access"));
exports.taskRoutes = (0, express_1.Router)();
exports.taskRoutes.post("/", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield (0, taskController_1.addTask)(body);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.taskRoutes.get("/", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, taskController_1.getAllTask)();
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.taskRoutes.delete("/:id", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log('deleing...');
        yield (0, taskController_1.deleteTask)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}));
