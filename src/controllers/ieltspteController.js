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
exports.updateLanguageLead = exports.deleteLanguageLeads = exports.getLanguageLeads = exports.addLanguageLead = void 0;
const prisma_1 = require("../prisma");
const leadController_1 = require("./leadController");
const addLanguageLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const lead = yield tx.lead.create({
            data: {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                countryId: input.countryId,
                description: input.description,
                priority: input.priority,
            },
        });
        yield tx.languageLead.create({
            data: {
                leadId: lead.id,
                languageTypeId: input.languageTypeId,
                addmissionTypeId: input.admissionTypeId,
            },
        });
    }));
});
exports.addLanguageLead = addLanguageLead;
const updateLanguageLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        // Fetch the existing lead to ensure it exists
        const existingLead = yield tx.lead.findUnique({
            where: { id: input.id },
        });
        if (!existingLead) {
            throw new Error(`Lead with id ${input.id} does not exist.`);
        }
        if (input.toTransfer) {
            yield addLanguageLead({
                firstname: input.firstname,
                lastname: input.lastname,
                email: (_a = input.email) !== null && _a !== void 0 ? _a : '',
                phone: (_b = input.phone) !== null && _b !== void 0 ? _b : '',
                countryId: input.countryId,
                languageTypeId: input.languageTypeId,
                admissionTypeId: input.admissionTypeId,
                priority: input.priority,
                description: (_c = input.description) !== null && _c !== void 0 ? _c : '',
            });
            yield tx.lead.update({
                where: {
                    id: input.id
                },
                data: {
                    toTransferToLanguage: false,
                    transferredToLanguage: true
                }
            });
            return;
        }
        // Update the lead details
        yield tx.lead.update({
            where: { id: input.id },
            data: {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                countryId: input.countryId,
                description: input.description,
                priority: input.priority,
                archived: input.convert,
                toConvert: input.convert,
            },
        });
        // Update the associated language lead details
        yield tx.languageLead.updateMany({
            where: { leadId: input.id },
            data: {
                languageTypeId: input.languageTypeId,
                addmissionTypeId: input.admissionTypeId,
            },
        });
    }));
});
exports.updateLanguageLead = updateLanguageLead;
const getLanguageLeads = () => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const leads = yield tx.lead.findMany({
            where: {
                languageLead: {
                    isNot: null,
                },
                archived: false,
            },
            include: {
                country: true,
                languageLead: {
                    select: {
                        id: true,
                        languageType: true,
                        admissionType: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return leads.map((x) => {
            var _a, _b, _c;
            return (Object.assign(Object.assign({}, x), { languageLeadId: (_a = x.languageLead) === null || _a === void 0 ? void 0 : _a.id, languageType: (_b = x.languageLead) === null || _b === void 0 ? void 0 : _b.languageType, admissionType: (_c = x.languageLead) === null || _c === void 0 ? void 0 : _c.admissionType, languageLead: undefined }));
        });
    }));
    const _drafts = yield (0, leadController_1.getTransferredLead)();
    const drafts = _drafts.map((draft) => ({
        id: draft.id,
        firstname: draft.firstname,
        lastname: draft.lastname,
        email: draft.email,
        phone: draft.phone,
        countryId: draft.countryId,
        description: draft.description,
        converted: false,
        priority: draft.priority,
        archived: false,
        toConvert: false,
        toTransferToLanguage: true,
        transferredToLanguage: false,
        country: draft.country,
        languageLeadId: undefined,
        languageType: undefined,
        admissionType: undefined,
    }));
    return [...drafts, ...leads];
});
exports.getLanguageLeads = getLanguageLeads;
const deleteLanguageLeads = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.languageLead.deleteMany({
            where: {
                leadId: id,
            },
        });
        yield tx.lead.deleteMany({
            where: {
                id: id,
            },
        });
    }));
});
exports.deleteLanguageLeads = deleteLanguageLeads;
