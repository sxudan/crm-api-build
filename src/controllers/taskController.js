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
exports.deleteTask = exports.getAllTask = exports.addTask = void 0;
const prisma_1 = require("../prisma");
const time_1 = require("../utils/time");
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.task.create({
        data: {
            name: task.name,
            assignedToId: task.assignedToId,
            description: task.description,
            dueDate: task.dueDate ? new Date(task.dueDate * 1000) : null,
        },
    });
});
exports.addTask = addTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.task.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteTask = deleteTask;
const getAllTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma_1.prisma.task.findMany({
        include: {
            assignedTo: {
                include: {
                    user: true,
                },
            },
        },
    });
    const results = tasks.map((t) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        dueDate: t.dueDate ? (0, time_1.dateToEpochSeconds)(t.dueDate) : null,
        assignedTo: {
            id: t.assignedTo.user.id,
            firstname: t.assignedTo.firstname,
            lastname: t.assignedTo.lastname,
            email: t.assignedTo.user.email,
            phone: t.assignedTo.phone,
            role: t.assignedTo.roleId,
            branchId: t.assignedTo.branchId,
        },
    }));
    return results;
});
exports.getAllTask = getAllTask;
