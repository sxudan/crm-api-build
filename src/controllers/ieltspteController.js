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
const types_1 = require("../models/types");
const addLanguageLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const lead = yield tx.lead.create({
            data: {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                countryId: input.countryId,
                description: input.description,
                priority: input.priority,
                courseName: (_a = input.courseName) !== null && _a !== void 0 ? _a : "",
                // booking
            },
        });
        if (input.assignedTo) {
            yield tx.task.create({
                data: {
                    leadId: lead.id,
                    name: `Follow up ${input.firstname} ${input.lastname}`,
                    description: "",
                    dueDate: input.followUpDate ? new Date(input.followUpDate) : null,
                    assignedToId: input.assignedTo,
                },
            });
        }
        let bookingId = null;
        let classBookingId = null;
        if (input.admissionTypeId === types_1.AdmissionTypes.Booking) {
            if (input.courseName && input.bookedDate && input.paymentMode && input.venue && input.bookingStatus) {
                const booking = yield tx.booking.create({
                    data: {
                        bookedDate: input.bookedDate ? new Date(input.bookedDate) : '',
                        paymentMode: input.paymentMode,
                        venue: input.venue,
                        status: input.bookingStatus,
                        comments: (_b = input.bookingComments) !== null && _b !== void 0 ? _b : '',
                        amount: (_c = input.amount) !== null && _c !== void 0 ? _c : 0,
                        receivedBy: (_d = input.receivedBy) !== null && _d !== void 0 ? _d : '',
                        currencyCode: (_e = input.currencyCode) !== null && _e !== void 0 ? _e : 'NPR',
                        paymentStatus: (_f = input.paymentStatus) !== null && _f !== void 0 ? _f : client_1.PaymentStatus.UnPaid
                    }
                });
                bookingId = booking.id;
            }
            else {
                throw new Error('Invalid parameter');
            }
        }
        else if (input.admissionTypeId === types_1.AdmissionTypes.Class) {
            if (input.courseName && input.shift && input.paymentStatus && input.commencementDate) {
                const classBooking = yield tx.classBooking.create({
                    data: {
                        shift: input.shift,
                        commencementDate: input.commencementDate
                            ? new Date(input.commencementDate)
                            : undefined,
                        paymentStatus: (_g = input.paymentStatus) !== null && _g !== void 0 ? _g : client_1.PaymentStatus.UnPaid,
                        currencyCode: (_h = input.currencyCode) !== null && _h !== void 0 ? _h : "NPR",
                        amount: (_j = input.amount) !== null && _j !== void 0 ? _j : 0,
                        receivedBy: (_k = input.receivedBy) !== null && _k !== void 0 ? _k : "NPR",
                        instructorId: input.instructorId,
                        comments: (_l = input.comments) !== null && _l !== void 0 ? _l : "",
                    },
                });
                classBookingId = classBooking.id;
            }
            else {
                console.log(input);
                throw new Error('Invalid parameters');
            }
        }
        else {
            classBookingId = null;
            bookingId = null;
        }
        yield tx.languageLead.create({
            data: {
                leadId: lead.id,
                // languageTypeId: input.languageTypeId,
                addmissionTypeId: input.admissionTypeId,
                classBookingId: classBookingId,
                bookingId: bookingId
            },
        });
    }));
});
exports.addLanguageLead = addLanguageLead;
const updateLanguageLead = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
        // Fetch the existing lead to ensure it exists
        const existingLead = yield tx.lead.findUnique({
            where: { id: input.id },
            include: {
                languageLead: {
                    include: {
                        classBooking: true,
                        booking: true,
                    }
                },
                task: true
            }
        });
        if (!existingLead) {
            throw new Error(`Lead with id ${input.id} does not exist.`);
        }
        // if (input.classBookingId && input.bookingId) {
        //   throw new Error ('Class and Booking cannot exist together')
        // }
        // if (!input.classBookingId && !input.bookingId) {
        //   throw new Error('Empty class and booking id')
        // }
        if (input.toTransfer) {
            yield addLanguageLead({
                firstname: input.firstname,
                lastname: input.lastname,
                email: (_m = input.email) !== null && _m !== void 0 ? _m : "",
                phone: (_o = input.phone) !== null && _o !== void 0 ? _o : "",
                countryId: input.countryId,
                languageTypeId: input.languageTypeId,
                admissionTypeId: input.admissionTypeId,
                priority: input.priority,
                description: (_p = input.description) !== null && _p !== void 0 ? _p : "",
                courseName: input.courseName,
                commencementDate: input.commencementDate,
                paymentStatus: input.paymentStatus,
                shift: input.shift,
                currencyCode: input.currencyCode,
                amount: input.amount,
                receivedBy: input.receivedBy,
                instructorId: input.instructorId,
                comments: input.comments,
                bookedDate: input.bookedDate,
                paymentMode: input.paymentMode,
                venue: input.venue,
                bookingStatus: input.bookingStatus,
                bookingComments: input.bookingComments,
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
        const taskId = (_q = existingLead.task) === null || _q === void 0 ? void 0 : _q.id;
        if (taskId) {
            yield tx.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    assignedToId: input.assignedTo,
                    dueDate: input.followUpDate ? new Date(input.followUpDate) : null,
                },
            });
        }
        else {
            if (input.assignedTo) {
                yield tx.task.create({
                    data: {
                        name: `Follow up ${input.firstname} ${input.lastname}`,
                        description: "",
                        assignedToId: input.assignedTo,
                        dueDate: input.followUpDate ? new Date(input.followUpDate) : null,
                        leadId: input.id,
                    },
                });
            }
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
                courseName: input.courseName,
            },
        });
        if ((_r = existingLead.languageLead) === null || _r === void 0 ? void 0 : _r.classBookingId) {
            yield tx.classBooking.delete({
                where: {
                    id: (_s = existingLead.languageLead) === null || _s === void 0 ? void 0 : _s.classBookingId
                }
            });
        }
        if ((_t = existingLead.languageLead) === null || _t === void 0 ? void 0 : _t.bookingId) {
            yield tx.booking.delete({
                where: {
                    id: (_u = existingLead.languageLead) === null || _u === void 0 ? void 0 : _u.bookingId
                }
            });
        }
        let bookingId = null;
        let classBookingId = null;
        if (input.admissionTypeId === types_1.AdmissionTypes.Booking) {
            if (input.courseName && input.bookedDate && input.paymentMode && input.venue && input.bookingStatus) {
                const booking = yield tx.booking.create({
                    data: {
                        bookedDate: input.bookedDate ? new Date(input.bookedDate) : '',
                        paymentMode: input.paymentMode,
                        venue: input.venue,
                        status: input.bookingStatus,
                        comments: (_v = input.bookingComments) !== null && _v !== void 0 ? _v : '',
                        amount: (_w = input.amount) !== null && _w !== void 0 ? _w : 0,
                        receivedBy: (_x = input.receivedBy) !== null && _x !== void 0 ? _x : '',
                        currencyCode: (_y = input.currencyCode) !== null && _y !== void 0 ? _y : 'NPR',
                        paymentStatus: (_z = input.paymentStatus) !== null && _z !== void 0 ? _z : client_1.PaymentStatus.UnPaid
                    }
                });
                bookingId = booking.id;
            }
            else {
                throw new Error('Invalid parameter');
            }
        }
        else if (input.admissionTypeId === types_1.AdmissionTypes.Class) {
            if (input.courseName && input.shift && input.paymentStatus && input.commencementDate) {
                const classBooking = yield tx.classBooking.create({
                    data: {
                        shift: input.shift,
                        commencementDate: input.commencementDate
                            ? new Date(input.commencementDate)
                            : undefined,
                        paymentStatus: (_0 = input.paymentStatus) !== null && _0 !== void 0 ? _0 : client_1.PaymentStatus.UnPaid,
                        currencyCode: (_1 = input.currencyCode) !== null && _1 !== void 0 ? _1 : "NPR",
                        amount: (_2 = input.amount) !== null && _2 !== void 0 ? _2 : 0,
                        receivedBy: (_3 = input.receivedBy) !== null && _3 !== void 0 ? _3 : "NPR",
                        instructorId: input.instructorId,
                        comments: (_4 = input.comments) !== null && _4 !== void 0 ? _4 : "",
                    },
                });
                classBookingId = classBooking.id;
            }
            else {
                throw new Error('Invalid parameters');
            }
        }
        else {
            classBookingId = null;
            bookingId = null;
        }
        // Update the associated language lead details
        yield tx.languageLead.updateMany({
            where: { leadId: input.id },
            data: {
                // languageTypeId: input.languageTypeId,
                addmissionTypeId: input.admissionTypeId,
                classBookingId: classBookingId,
                bookingId: bookingId
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
                task: true,
                languageLead: {
                    select: {
                        id: true,
                        // languageType: true,
                        admissionType: true,
                        classBooking: true,
                        booking: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return leads.map((x) => {
            var _a, _b, _c, _d;
            return (Object.assign(Object.assign({}, x), { languageLeadId: (_a = x.languageLead) === null || _a === void 0 ? void 0 : _a.id, 
                // languageType: x.languageLead?.languageType,
                admissionType: (_b = x.languageLead) === null || _b === void 0 ? void 0 : _b.admissionType, classBooking: (_c = x.languageLead) === null || _c === void 0 ? void 0 : _c.classBooking, booking: (_d = x.languageLead) === null || _d === void 0 ? void 0 : _d.booking, languageLead: undefined }));
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
    var _5, _6, _7, _8;
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
            task: true,
            languageLead: {
                select: {
                    id: true,
                    // languageType: true,
                    admissionType: true,
                    classBooking: true,
                    booking: true
                },
            },
        },
    });
    if (!lead) {
        return null;
    }
    return Object.assign(Object.assign({}, lead), { languageLeadId: (_5 = lead.languageLead) === null || _5 === void 0 ? void 0 : _5.id, 
        // languageType: lead.languageLead?.languageType,
        admissionType: (_6 = lead.languageLead) === null || _6 === void 0 ? void 0 : _6.admissionType, classBooking: (_7 = lead.languageLead) === null || _7 === void 0 ? void 0 : _7.classBooking, booking: (_8 = lead.languageLead) === null || _8 === void 0 ? void 0 : _8.booking, languageLead: undefined });
});
exports.getLanguageLeadById = getLanguageLeadById;
