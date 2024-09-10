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
exports.deleteCourseField = exports.deleteCourseLevel = exports.updateCourseLevel = exports.addCourseLevel = exports.updateCourseField = exports.addCourseField = void 0;
const prisma_1 = require("../prisma");
const addCourseField = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.courseField.create({
        data: data
    });
});
exports.addCourseField = addCourseField;
const updateCourseField = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.courseField.update({
        where: {
            id: data.id,
        },
        data: data
    });
});
exports.updateCourseField = updateCourseField;
const addCourseLevel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.courseLevel.create({
        data: data
    });
});
exports.addCourseLevel = addCourseLevel;
const updateCourseLevel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.courseLevel.update({
        where: {
            id: data.id,
        },
        data: data
    });
});
exports.updateCourseLevel = updateCourseLevel;
const deleteCourseField = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.courseField.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteCourseField = deleteCourseField;
const deleteCourseLevel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.courseLevel.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteCourseLevel = deleteCourseLevel;
