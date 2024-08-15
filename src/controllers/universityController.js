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
const exception_1 = require("../models/exception");
const prisma_1 = require("../prisma");
const addUniversity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const university = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const requirement = yield tx.universityScholarshipRequirement.create({
            data: {
                pteRequirement: input.pteRequirement,
                ieltsRequirement: input.ieltsRequirement,
                toeflRequirement: input.toeflRequirement,
                academicRequirement: input.academicRequirement,
                scholarshipRequirement: input.scholarshipRequirement,
                comments: input.requirementComments,
                otherRequirement: input.otherRequirement
            }
        });
        console.log(input);
        const university = yield tx.university.create({
            data: {
                name: input.universityName,
                countryId: input.countryId,
                direct: input.isDirect,
                websiteUrl: input.websiteUrl,
                contactPersonEmail: input.contactPersonEmail,
                contactPersonName: input.contactPersonName,
                contactPersonJobTitle: input.contactPersonJobTitle,
                contactPersonPhoneNumber: input.contactPersonPhoneNumber,
                comments: input.comments,
                requirementId: requirement.id
            },
        });
        yield tx.address.createMany({
            data: input.addresses.map((x) => ({
                street1: x.street1,
                street2: x.street2,
                state: x.state,
                city: x.city,
                postalcode: x.postalcode,
                universityId: university.id,
            })),
        });
        return university;
    }));
    return university;
});
exports.addUniversity = addUniversity;
const updateUniversity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const university = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let uni = yield tx.university.findUnique({ where: { id: input.id } });
        if (!uni) {
            throw new exception_1.NotFoundException();
        }
        let requirementId = uni.requirementId;
        if (requirementId) {
            yield tx.universityScholarshipRequirement.update({
                where: {
                    id: requirementId
                },
                data: {
                    pteRequirement: input.pteRequirement,
                    ieltsRequirement: input.ieltsRequirement,
                    toeflRequirement: input.toeflRequirement,
                    academicRequirement: input.academicRequirement,
                    scholarshipRequirement: input.scholarshipRequirement,
                    comments: input.requirementComments
                }
            });
        }
        else {
            const requirement = yield tx.universityScholarshipRequirement.create({
                data: {
                    pteRequirement: input.pteRequirement,
                    ieltsRequirement: input.ieltsRequirement,
                    toeflRequirement: input.toeflRequirement,
                    academicRequirement: input.academicRequirement,
                    scholarshipRequirement: input.scholarshipRequirement,
                    comments: input.requirementComments,
                    otherRequirement: input.otherRequirement
                }
            });
            requirementId = requirement.id;
        }
        const university = yield tx.university.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.universityName,
                countryId: input.countryId,
                direct: input.isDirect,
                websiteUrl: input.websiteUrl,
                contactPersonEmail: input.contactPersonEmail,
                contactPersonName: input.contactPersonName,
                contactPersonJobTitle: input.contactPersonJobTitle,
                contactPersonPhoneNumber: input.contactPersonPhoneNumber,
                comments: input.comments,
                requirementId: requirementId
            },
        });
        for (const deleteId of (_a = input.toDeleteAddresses) !== null && _a !== void 0 ? _a : []) {
            yield tx.address.delete({
                where: {
                    id: deleteId
                }
            });
        }
        for (const address of (_b = input.addresses) !== null && _b !== void 0 ? _b : []) {
            if (address.id) {
                yield tx.address.update({
                    where: {
                        id: address.id,
                    },
                    data: {
                        street1: address.street1,
                        street2: address.street2,
                        state: address.state,
                        city: address.city,
                        postalcode: address.postalcode,
                        universityId: university.id,
                    },
                });
            }
            else {
                yield tx.address.create({
                    data: {
                        street1: address.street1,
                        street2: address.street2,
                        state: address.state,
                        city: address.city,
                        postalcode: address.postalcode,
                        universityId: university.id,
                    },
                });
            }
        }
        return university;
    }));
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
            direct: true,
            courses: true,
            addresses: true,
            longAddresses: true,
            requirement: true,
            contactPersonEmail: true,
            contactPersonJobTitle: true,
            contactPersonName: true,
            contactPersonPhoneNumber: true,
            websiteUrl: true,
            comments: true
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
            addresses: true,
            longAddresses: true,
            direct: true,
            country: {
                select: {
                    name: true,
                    id: true,
                },
            },
            requirement: true,
            contactPersonEmail: true,
            contactPersonJobTitle: true,
            contactPersonName: true,
            contactPersonPhoneNumber: true,
            websiteUrl: true,
            comments: true
        },
    });
    return universities;
});
exports.getUniversities = getUniversities;
const getUniversitiesByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    const universities = yield prisma_1.prisma.university.findMany({
        where: {
            countryId: countryId,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            addresses: true,
            longAddresses: true,
            direct: true,
            country: {
                select: {
                    name: true,
                    id: true,
                },
            },
            requirement: true,
            contactPersonEmail: true,
            contactPersonJobTitle: true,
            contactPersonName: true,
            contactPersonPhoneNumber: true,
            websiteUrl: true,
            comments: true
        },
    });
    return universities;
});
exports.getUniversitiesByCountry = getUniversitiesByCountry;
const deleteUniversity = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.address.deleteMany({
            where: { universityId: id }
        });
        yield prisma_1.prisma.university.delete({
            where: {
                id: id,
            },
        });
    }));
});
exports.deleteUniversity = deleteUniversity;
