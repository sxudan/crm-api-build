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
exports.getLanguageLeadById = exports.updateLanguageLead = exports.deleteLanguageLeads = exports.getLanguageLeads = exports.addLanguageLead = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../prisma");
const leadController_1 = require("./leadController");
const addLanguageLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
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
        const classBooking = yield tx.classBooking.create({
            data: {
                name: (_a = input.className) !== null && _a !== void 0 ? _a : "",
                shift: input.shift,
                commencementDate: input.commencementDate
                    ? new Date(input.commencementDate)
                    : undefined,
                paymentStatus: (_b = input.paymentStatus) !== null && _b !== void 0 ? _b : client_1.PaymentStatus.UnPaid,
                currencyCode: (_c = input.currencyCode) !== null && _c !== void 0 ? _c : "NPR",
                amount: (_d = input.amount) !== null && _d !== void 0 ? _d : 0,
                receivedBy: (_e = input.receivedBy) !== null && _e !== void 0 ? _e : "NPR",
                instructorId: input.instructorId,
                comments: (_f = input.comments) !== null && _f !== void 0 ? _f : "",
            },
        });
        yield tx.languageLead.create({
            data: {
                leadId: lead.id,
                languageTypeId: input.languageTypeId,
                addmissionTypeId: input.admissionTypeId,
                classBookingId: classBooking.id,
            },
        });
    }));
});
exports.addLanguageLead = addLanguageLead;
const updateLanguageLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _g, _h, _j;
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
                email: (_g = input.email) !== null && _g !== void 0 ? _g : "",
                phone: (_h = input.phone) !== null && _h !== void 0 ? _h : "",
                countryId: input.countryId,
                languageTypeId: input.languageTypeId,
                admissionTypeId: input.admissionTypeId,
                priority: input.priority,
                description: (_j = input.description) !== null && _j !== void 0 ? _j : "",
            });
            yield tx.lead.update({
                where: {
                    id: input.id,
                },
                data: {
                    toTransferToLanguage: false,
                    transferredToLanguage: true,
                },
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
        const classBooking = yield tx.classBooking.update({
            where: {
                id: input.bookingId,
            },
            data: {
                name: input.className,
                shift: input.shift,
                commencementDate: input.commencementDate
                    ? new Date(input.commencementDate)
                    : undefined,
                paymentStatus: input.paymentStatus,
                currencyCode: input.currencyCode,
                amount: input.amount,
                receivedBy: input.receivedBy,
                instructorId: input.instructorId,
                comments: input.comments,
            },
        });
        // Update the associated language lead details
        yield tx.languageLead.updateMany({
            where: { leadId: input.id },
            data: {
                languageTypeId: input.languageTypeId,
                addmissionTypeId: input.admissionTypeId,
                classBookingId: classBooking.id,
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
                        classBooking: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return leads.map((x) => {
            var _a, _b, _c, _d;
            return (Object.assign(Object.assign({}, x), { languageLeadId: (_a = x.languageLead) === null || _a === void 0 ? void 0 : _a.id, languageType: (_b = x.languageLead) === null || _b === void 0 ? void 0 : _b.languageType, admissionType: (_c = x.languageLead) === null || _c === void 0 ? void 0 : _c.admissionType, classBooking: (_d = x.languageLead) === null || _d === void 0 ? void 0 : _d.classBooking, languageLead: undefined }));
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
        yield tx.classBooking.deleteMany({
            where: {
                languageLeads: {
                    some: {
                        id: id,
                    },
                },
            },
        });
        yield tx.lead.deleteMany({
            where: {
                languageLead: {
                    id: id,
                },
            },
        });
    }));
});
exports.deleteLanguageLeads = deleteLanguageLeads;
const getLanguageLeadById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o;
    const lead = yield prisma_1.prisma.lead.findUnique({
        where: {
            languageLead: {
                isNot: null,
            },
            archived: false,
            id: id,
        },
        include: {
            country: true,
            languageLead: {
                select: {
                    id: true,
                    languageType: true,
                    admissionType: true,
                    classBooking: true,
                },
            },
        },
    });
    if (!lead) {
        return null;
    }
    return Object.assign(Object.assign({}, lead), { languageLeadId: (_k = lead.languageLead) === null || _k === void 0 ? void 0 : _k.id, languageType: (_l = lead.languageLead) === null || _l === void 0 ? void 0 : _l.languageType, admissionType: (_m = lead.languageLead) === null || _m === void 0 ? void 0 : _m.admissionType, classBooking: (_o = lead.languageLead) === null || _o === void 0 ? void 0 : _o.classBooking, languageLead: undefined });
});
exports.getLanguageLeadById = getLanguageLeadById;
