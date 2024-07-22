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
exports.getTransferredLead = exports.getArchivedLeads = exports.updateLead = exports.deleteLead = exports.getLeads = exports.addLead = void 0;
const prisma_1 = require("../prisma");
const addLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.lead.create({
        data: {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,
            countryId: input.countryId,
            description: input.description,
            priority: input.priority,
            converted: false,
            archived: false,
            toConvert: false,
            service: input.service
        },
    });
});
exports.addLead = addLead;
const updateLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the existing lead to ensure it exists
    const existingLead = yield prisma_1.prisma.lead.findUnique({
        where: { id: input.id },
    });
    if (!existingLead) {
        throw new Error(`Lead with id ${input.id} does not exist.`);
    }
    // guard to prevent toConvert and transferToLanguage to be true
    if (input.convert == true && input.transfer == true) {
        throw new Error(`A lead can be converted and transferred at a same time`);
    }
    // Update the lead details
    yield prisma_1.prisma.lead.update({
        where: { id: input.id },
        data: {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            phone: input.phone,
            countryId: input.countryId,
            description: input.description,
            priority: input.priority,
            archived: input.convert || input.transfer,
            toConvert: input.convert,
            toTransferToLanguage: input.transfer,
            service: input.service
        },
    });
});
exports.updateLead = updateLead;
const getLeads = () => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const leads = yield tx.lead.findMany({
            where: {
                languageLead: null,
                archived: false,
            },
            include: {
                country: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return leads;
    }));
    return leads;
});
exports.getLeads = getLeads;
const getArchivedLeads = () => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const leads = yield tx.lead.findMany({
            where: {
                archived: true,
                converted: false,
                toConvert: true,
            },
            include: {
                country: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return leads;
    }));
    return leads;
});
exports.getArchivedLeads = getArchivedLeads;
const getTransferredLead = () => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const leads = yield tx.lead.findMany({
            where: {
                archived: true,
                transferredToLanguage: false,
                toTransferToLanguage: true,
            },
            include: {
                country: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return leads;
    }));
    return leads;
});
exports.getTransferredLead = getTransferredLead;
const deleteLead = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.lead.deleteMany({
            where: {
                id: id,
            },
        });
    }));
});
exports.deleteLead = deleteLead;
