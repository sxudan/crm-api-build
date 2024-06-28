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
exports.updateApplicant = exports.deleteApplicant = exports.getApplicants = exports.addApplicant = void 0;
const prisma_1 = require("../prisma");
const addApplicant = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.application.create({
        data: {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,
            countryId: input.countryId,
            description: input.description,
            leadId: input.leadId,
            visaStatusId: input.statusId,
            intakeId: input.intakeId,
            courseId: input.courseId,
            universityId: input.universityId,
            archived: false,
            passportCountry: input.passportCountry,
            referer: input.referer,
            dob: new Date(input.dob)
        },
    });
});
exports.addApplicant = addApplicant;
const updateApplicant = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the existing lead to ensure it exists
    const existingLead = yield prisma_1.prisma.application.findUnique({
        where: { id: input.id },
    });
    if (!existingLead) {
        throw new Error(`Lead with id ${input.id} does not exist.`);
    }
    // Update the lead details
    yield prisma_1.prisma.application.update({
        where: { id: input.id },
        data: {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,
            countryId: input.countryId,
            description: input.description,
            visaStatusId: input.statusId,
            intakeId: input.intakeId,
            courseId: input.courseId,
            universityId: input.universityId,
            dob: input.dob ? new Date(input.dob) : undefined
        },
    });
});
exports.updateApplicant = updateApplicant;
const getApplicants = () => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const leads = yield tx.application.findMany({
            include: {
                country: true,
                course: true,
                university: true,
                visaStatus: true
            },
        });
        return leads;
    }));
    return leads;
});
exports.getApplicants = getApplicants;
const deleteApplicant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.application.deleteMany({
            where: {
                id: id,
            },
        });
    }));
});
exports.deleteApplicant = deleteApplicant;
