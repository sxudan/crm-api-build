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
exports.getUniversitiesByCountry = exports.updateUniversity = exports.getUniversity = exports.getUniversities = exports.deleteUniversity = exports.addUniversity = void 0;
const prisma_1 = require("../prisma");
const addUniversity = (universityName, countryId) => __awaiter(void 0, void 0, void 0, function* () {
    const university = yield prisma_1.prisma.university.create({
        data: {
            name: universityName,
            countryId: countryId,
        },
    });
    return university;
});
exports.addUniversity = addUniversity;
const updateUniversity = (id, universityName, countryId) => __awaiter(void 0, void 0, void 0, function* () {
    const university = yield prisma_1.prisma.university.update({
        where: {
            id: id,
        },
        data: {
            name: universityName,
            countryId: countryId,
        },
    });
    return university;
});
exports.updateUniversity = updateUniversity;
const getUniversity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const raw = yield prisma_1.prisma.university.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            country: {
                select: {
                    id: true,
                    name: true,
                },
            },
            courses: true,
        },
    });
    if (raw) {
        return Object.assign(Object.assign({}, raw), { courses: raw.courses });
    }
    return null;
});
exports.getUniversity = getUniversity;
const getUniversities = () => __awaiter(void 0, void 0, void 0, function* () {
    const universities = yield prisma_1.prisma.university.findMany({
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            country: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
    return universities;
});
exports.getUniversities = getUniversities;
const getUniversitiesByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    const universities = yield prisma_1.prisma.university.findMany({
        where: {
            countryId: countryId
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            country: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
    });
    return universities;
});
exports.getUniversitiesByCountry = getUniversitiesByCountry;
const deleteUniversity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.university.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteUniversity = deleteUniversity;
