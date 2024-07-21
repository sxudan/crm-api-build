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
exports.updateSubagent = exports.getSubagents = exports.deleteSubAgent = exports.addSubagent = void 0;
const prisma_1 = require("../prisma");
const addSubagent = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.prisma.subAgent.create({
        data: Object.assign({}, agent),
    });
    return res;
});
exports.addSubagent = addSubagent;
const updateSubagent = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.prisma.subAgent.update({
        where: {
            id: agent.id
        },
        data: Object.assign({}, agent),
    });
    return res;
});
exports.updateSubagent = updateSubagent;
const getSubagents = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield prisma_1.prisma.subAgent.findMany();
    return res;
});
exports.getSubagents = getSubagents;
const deleteSubAgent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.subAgent.delete({
        where: {
            id: id
        }
    });
});
exports.deleteSubAgent = deleteSubAgent;
