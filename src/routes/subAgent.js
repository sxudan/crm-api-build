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
exports.subAgentRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const access_1 = __importDefault(require("../middlewares/access"));
const subagentController_1 = require("../controllers/subagentController");
exports.subAgentRouter = (0, express_1.Router)();
exports.subAgentRouter.post("/", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const rs = yield (0, subagentController_1.addSubagent)(body);
        res.status(200).send({ success: true, data: rs });
    }
    catch (e) {
        next(e);
    }
}));
exports.subAgentRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, subagentController_1.deleteSubAgent)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.subAgentRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rs = yield (0, subagentController_1.getSubagents)();
        res.status(200).send({ success: true, data: rs });
    }
    catch (e) {
        next(e);
    }
}));
