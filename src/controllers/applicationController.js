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
exports.updateProfileImage = exports.getApplicationCount = exports.getApplicant = exports.searchApplicants = exports.updateApplicantStatus = exports.updateApplicant = exports.deleteApplicant = exports.getApplicants = exports.addApplicant = void 0;
const prisma_1 = require("../prisma");
const time_1 = require("../utils/time");
const leadController_1 = require("./leadController");
const addApplicant = (input, converted) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const application = yield tx.application.create({
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
                appliedViaId: input.appliedViaId,
                dob: new Date(input.dob),
                isDirect: input.isDirect,
                subAgentId: input.subagentId,
                universityLongAddressId: input.universityLongAddressId,
                intake: input.intake,
                year: input.year,
                converted: converted,
                followUpDate: input.followUpDate ? new Date(input.followUpDate) : undefined,
                maritalStatus: input.maritalStatus,
                spouseFullName: input.spouseFullName,
                spouseDob: input.spouseDob ? new Date(input.spouseDob) : undefined,
                spouseHighestEducationLevel: input.spouseHighestEducationLevel,
                accompanying: input.accompanying,
                previousHighestEducationLevel: input.previousHighestEducationLevel,
                previousCourseName: input.previousCourseName,
                previousYearOfGraduation: input.previousYearOfGraduation,
                previousOverallScore: input.previousOverallScore,
                previousLanguageTestType: input.previousLanguageOtherTestType,
                previousLanguageOtherTestType: input.previousLanguageOtherTestType,
                previousLanguageScore: input.previousLanguageScore,
                emergencyContactName: input.emergencyContactName,
                emergencyContactRelation: input.emergencyContactRelation,
                emergencyContactPhone: input.emergencyContactPhone,
                emergencyContactEmail: input.emergencyContactEmail,
                preferredCommunicationMethod: input.preferredCommunicationMethod,
                profileImage: input.profileImage
            },
        });
        if (input.assignedTo && input.followUpDate) {
            yield tx.task.create({
                data: {
                    name: `Follow up ${input.firstname} ${input.lastname}`,
                    description: "",
                    assignedToId: input.assignedTo,
                    dueDate: input.followUpDate ? new Date(input.followUpDate) : null,
                    applicationId: application.id
                },
            });
        }
    }));
});
exports.addApplicant = addApplicant;
const updateProfileImage = (applicantId, profileImagePath) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.application.update({
        where: {
            id: applicantId
        },
        data: {
            profileImage: profileImagePath
        }
    });
});
exports.updateProfileImage = updateProfileImage;
const searchApplicants = (query, applicationStatusIds, isDirect, intake, years, country, institution, course, intakes) => __awaiter(void 0, void 0, void 0, function* () {
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
                { year: { in: years } },
                { countryId: { equals: country } },
                { universityId: { equals: institution } },
                { courseId: { equals: course } },
                { intake: { in: intakes } },
            ],
        },
        include: {
            country: true,
            course: true,
            university: true,
            visaStatus: true,
            subAgent: true,
            universityLongAddress: true,
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
    var _a, _b;
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
                    dob: new Date(input.dob),
                    passportCountry: input.passportCountry,
                    countryId: input.countryId,
                    description: (_a = input.description) !== null && _a !== void 0 ? _a : "",
                    intake: input.intake,
                    year: input.year,
                    courseId: input.courseId,
                    universityId: input.universityId,
                    universityLongAddressId: input.universityLongAddressId,
                    leadId: input.leadId,
                    isDirect: (_b = input.isDirect) !== null && _b !== void 0 ? _b : true,
                    referer: input.referer,
                    statusId: input.statusId,
                    subagentId: input.subagentId,
                    followUpDate: input.followUpDate ? new Date(input.followUpDate) : undefined,
                    maritalStatus: input.maritalStatus,
                    spouseFullName: input.spouseFullName,
                    spouseDob: input.spouseDob ? new Date(input.spouseDob) : undefined,
                    spouseHighestEducationLevel: input.spouseHighestEducationLevel,
                    accompanying: input.accompanying,
                    appliedViaId: input.appliedViaId,
                    previousHighestEducationLevel: input.previousHighestEducationLevel,
                    previousCourseName: input.previousCourseName,
                    previousYearOfGraduation: input.previousYearOfGraduation,
                    previousOverallScore: input.previousOverallScore,
                    previousLanguageTestType: input.previousLanguageOtherTestType,
                    previousLanguageOtherTestType: input.previousLanguageOtherTestType,
                    previousLanguageScore: input.previousLanguageScore,
                    emergencyContactName: input.emergencyContactName,
                    emergencyContactRelation: input.emergencyContactRelation,
                    emergencyContactPhone: input.emergencyContactPhone,
                    emergencyContactEmail: input.emergencyContactEmail,
                    preferredCommunicationMethod: input.preferredCommunicationMethod,
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
        var _c;
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
                appliedViaId: input.appliedViaId,
                universityLongAddressId: input.universityLongAddressId,
                year: input.year,
                followUpDate: input.followUpDate ? new Date(input.followUpDate) : undefined,
                maritalStatus: input.maritalStatus,
                spouseFullName: input.spouseFullName,
                spouseDob: input.spouseDob ? new Date(input.spouseDob) : undefined,
                spouseHighestEducationLevel: input.spouseHighestEducationLevel,
                accompanying: input.accompanying,
                previousHighestEducationLevel: input.previousHighestEducationLevel,
                previousCourseName: input.previousCourseName,
                previousYearOfGraduation: input.previousYearOfGraduation,
                previousOverallScore: input.previousOverallScore,
                previousLanguageTestType: input.previousLanguageOtherTestType,
                previousLanguageOtherTestType: input.previousLanguageOtherTestType,
                previousLanguageScore: input.previousLanguageScore,
                emergencyContactName: input.emergencyContactName,
                emergencyContactRelation: input.emergencyContactRelation,
                emergencyContactPhone: input.emergencyContactPhone,
                emergencyContactEmail: input.emergencyContactEmail,
                preferredCommunicationMethod: input.preferredCommunicationMethod,
            },
        });
        let taskId = (_c = existingLead.task) === null || _c === void 0 ? void 0 : _c.id;
        if (taskId) {
            console.log('assigned to', input.assignedTo);
            yield tx.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    assignedToId: input.assignedTo,
                    dueDate: input.followUpDate ? new Date(input.followUpDate) : null,
                    applicationId: input.id
                },
            });
        }
        else {
            if (input.assignedTo && input.followUpDate) {
                const task = yield tx.task.create({
                    data: {
                        name: `Follow up ${input.firstname} ${input.lastname}`,
                        description: "",
                        assignedToId: input.assignedTo,
                        dueDate: input.followUpDate ? new Date(input.followUpDate) : null,
                        applicationId: input.id
                    },
                });
            }
        }
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
            universityLongAddress: true,
            task: true,
            appliedVia: true,
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
                universityLongAddress: true,
                task: true,
                appliedVia: true,
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
        universityLongAddressId: undefined,
        universityLongAddress: {
            street1: undefined,
            street2: undefined,
            city: undefined,
            postalcode: undefined,
            state: undefined,
        },
        leadId: c.id,
        visaStatusId: undefined,
        archived: c.archived,
        isDirect: true,
        referer: "",
        subAgentId: null,
        appliedViaId: null,
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
        appliedVia: null,
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
const getApplicationCount = (date, visaStatusIds, countryId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!date) {
        // If no date is provided, return the count of all leads
        return yield prisma_1.prisma.application.count({
            where: Object.assign(Object.assign({}, (visaStatusIds &&
                visaStatusIds.length > 0 && {
                OR: visaStatusIds.map((id) => ({
                    visaStatusId: id,
                })),
            })), { countryId: countryId }),
        });
    }
    const { startOfMonth, endOfMonth } = (0, time_1.getStartAndEnd)(date);
    return yield prisma_1.prisma.application.count({
        where: Object.assign({ createdAt: {
                gte: startOfMonth,
                lte: endOfMonth,
            } }, (visaStatusIds &&
            visaStatusIds.length > 0 && {
            OR: visaStatusIds.map((id) => ({
                visaStatusId: id,
            })),
        })),
    });
});
exports.getApplicationCount = getApplicationCount;
