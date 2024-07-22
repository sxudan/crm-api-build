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
exports.getApplicant = exports.searchApplicants = exports.updateApplicantStatus = exports.updateApplicant = exports.deleteApplicant = exports.getApplicants = exports.addApplicant = void 0;
const prisma_1 = require("../prisma");
const leadController_1 = require("./leadController");
const addApplicant = (input, converted) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (input.assignedTo && input.followUpDate) {
            yield tx.task.create({
                data: {
                    name: `Follow up ${input.firstname} ${input.lastname}`,
                    description: "",
                    assignedToId: input.assignedTo,
                    dueDate: input.followUpDate
                        ? new Date(input.followUpDate * 1000)
                        : null,
                },
            });
        }
        yield tx.application.create({
            data: {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                countryId: input.countryId,
                description: input.description,
                leadId: input.leadId,
                visaStatusId: input.statusId,
                courseId: input.courseId,
                universityId: input.universityId,
                archived: false,
                passportCountry: input.passportCountry,
                referer: input.referer,
                dob: new Date(input.dob),
                isDirect: input.isDirect,
                subAgentId: input.subagentId,
                universityAddress: input.universityAddress,
                intake: input.intake,
                year: input.year,
                converted: converted,
            },
        });
    }));
});
exports.addApplicant = addApplicant;
const searchApplicants = (query, applicationStatusIds, isDirect, intake, year, country, institution, course) => __awaiter(void 0, void 0, void 0, function* () {
    const applicants = yield prisma_1.prisma.application.findMany({
        where: {
            OR: [
                { firstname: { contains: query, mode: "insensitive" } },
                { lastname: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
                { phone: { contains: query, mode: "insensitive" } },
            ],
            AND: [
                {
                    visaStatusId: applicationStatusIds.length === 0
                        ? undefined
                        : { in: applicationStatusIds },
                },
                { isDirect: { equals: isDirect } },
                { intake: { equals: intake } },
                { year: { equals: year } },
                { countryId: { equals: country } },
                { universityId: { equals: institution } },
                { courseId: { equals: course } },
            ],
        },
        include: {
            country: true,
            course: true,
            university: true,
            visaStatus: true,
            subAgent: true,
        },
    });
    return applicants;
});
exports.searchApplicants = searchApplicants;
const updateApplicantStatus = (applicantId, statusId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.application.update({
        where: {
            id: applicantId,
        },
        data: {
            visaStatusId: statusId,
        },
    });
});
exports.updateApplicantStatus = updateApplicantStatus;
const updateApplicant = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Fetch the existing lead to ensure it exists
    const existingLead = yield prisma_1.prisma.application.findUnique({
        where: { id: input.id },
        include: {
            task: true,
        },
    });
    if (!existingLead) {
        if (input.leadId) {
            try {
                yield addApplicant({
                    firstname: input.firstname,
                    lastname: input.lastname,
                    email: input.email,
                    phone: input.phone,
                    dob: (_a = input.dob) !== null && _a !== void 0 ? _a : Date.now(),
                    passportCountry: input.passportCountry,
                    countryId: input.countryId,
                    description: (_b = input.description) !== null && _b !== void 0 ? _b : "",
                    intake: input.intake,
                    year: input.year,
                    courseId: input.courseId,
                    universityId: input.universityId,
                    universityAddress: input.universityAddress,
                    leadId: input.leadId,
                    isDirect: (_c = input.isDirect) !== null && _c !== void 0 ? _c : true,
                    referer: input.referer,
                    statusId: input.statusId,
                    subagentId: input.subagentId,
                }, true);
                prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
                    yield tx.lead.update({
                        where: {
                            id: input.leadId,
                        },
                        data: {
                            converted: true,
                            toConvert: false,
                        },
                    });
                }));
            }
            catch (e) { }
            return;
        }
        throw new Error(`Lead with id ${input.id} does not exist.`);
    }
    prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const taskId = (_d = existingLead.task) === null || _d === void 0 ? void 0 : _d.id;
        if (taskId) {
            tx.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    assignedToId: input.assignedTo,
                    dueDate: input.followUpDate
                        ? new Date(input.followUpDate * 1000)
                        : null,
                },
            });
        }
        else {
            if (input.assignedTo && input.followUpDate) {
                yield tx.task.create({
                    data: {
                        name: `Follow up ${input.firstname} ${input.lastname}`,
                        description: "",
                        assignedToId: input.assignedTo,
                        dueDate: input.followUpDate
                            ? new Date(input.followUpDate * 1000)
                            : null,
                    },
                });
            }
        }
        // Update the lead details
        yield tx.application.update({
            where: { id: input.id },
            data: {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                countryId: input.countryId,
                description: input.description,
                visaStatusId: input.statusId,
                intake: input.intake,
                courseId: input.courseId,
                universityId: input.universityId,
                dob: input.dob ? new Date(input.dob) : undefined,
                passportCountry: input.passportCountry,
                referer: input.referer,
                isDirect: input.isDirect,
                subAgentId: input.subagentId,
                universityAddress: input.universityAddress,
                year: input.year,
            },
        });
    }));
});
exports.updateApplicant = updateApplicant;
const getApplicant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.application.findUnique({
        where: {
            id: id,
        },
        include: {
            country: true,
            course: true,
            university: true,
            visaStatus: true,
            subAgent: true,
        },
    });
});
exports.getApplicant = getApplicant;
const getApplicants = () => __awaiter(void 0, void 0, void 0, function* () {
    let leads = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const leads = yield tx.application.findMany({
            include: {
                country: true,
                course: true,
                university: true,
                visaStatus: true,
                subAgent: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return leads;
    }));
    const _converted = yield (0, leadController_1.getArchivedLeads)();
    const converted = _converted.map((c) => ({
        id: parseInt(c.id + "00100"),
        firstname: c.firstname,
        lastname: c.lastname,
        email: c.email,
        phone: c.phone,
        dob: undefined,
        passportCountry: undefined,
        countryId: undefined,
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        intake: 0,
        year: undefined,
        courseId: undefined,
        universityId: undefined,
        universityAddress: undefined,
        leadId: c.id,
        visaStatusId: undefined,
        archived: c.archived,
        isDirect: true,
        referer: "",
        subAgentId: null,
        country: {
            id: undefined,
            name: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        converted: false,
        course: {
            id: undefined,
            name: undefined,
            universityId: undefined,
            intakes: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        university: {
            id: undefined,
            name: undefined,
            addresses: [],
            countryId: undefined,
            direct: undefined,
            createdAt: "2024-07-03T13:49:24.233Z",
            updatedAt: "2024-07-07T13:25:21.334Z",
        },
        visaStatus: {
            id: undefined,
            name: undefined,
            order: undefined,
            countryId: undefined,
        },
        subAgent: null,
    }));
    return [...converted, ...leads];
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
