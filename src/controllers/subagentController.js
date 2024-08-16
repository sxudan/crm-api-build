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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubagent = exports.getSubagents = exports.deleteSubAgent = exports.addSubagent = void 0;
const prisma_1 = require("../prisma");
const addSubagent = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const { agreementStartDate, agreementEndDate } = agent, rest = __rest(agent, ["agreementStartDate", "agreementEndDate"]);
    const res = yield prisma_1.prisma.subAgent.create({
        data: Object.assign(Object.assign({}, rest), { agreementEndDate: agreementEndDate ? new Date(agreementEndDate) : undefined, agreementStartDate: agreementStartDate ? new Date(agreementStartDate) : undefined }),
    });
    return res;
});
exports.addSubagent = addSubagent;
const updateSubagent = (agent) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id, agreementStartDate, agreementEndDate } = agent, rest = __rest(agent, ["id", "agreementStartDate", "agreementEndDate"]);
    const res = yield prisma_1.prisma.subAgent.update({
        where: {
            id: _id,
        },
        data: Object.assign(Object.assign({}, rest), { agreementEndDate: agreementEndDate ? new Date(agreementEndDate) : undefined, agreementStartDate: agreementStartDate ? new Date(agreementStartDate) : undefined }),
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
