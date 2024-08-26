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
exports.fetchGetCourseLevels = exports.fetchGetCourseFields = exports.getCoursesByUniversity = exports.updateCourse = exports.getCourses = exports.deleteCourse = exports.addCourse = void 0;
const prisma_1 = require("../prisma");
const addCourse = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const requirement = yield tx.universityRequirement.create({
            data: {
                pteRequirement: input.pteRequirement,
                ieltsRequirement: input.ieltsRequirement,
                toeflRequirement: input.toeflRequirement,
                academicRequirement: input.academicRequirement,
                scholarshipRequirement: input.scholarshipRequirement,
                scholarshipAmount: input.scholarshipAmount,
                comments: input.requirementComments,
                otherRequirement: input.otherRequirement,
            },
        });
        const course = yield tx.course.create({
            data: {
                name: input.courseName,
                countryId: input.countryId,
                universityId: input.universityId,
                intakes: input.intakes,
                courseField: input.courseField,
                courseLevel: input.courseLevel,
                duration: input.duration,
                annualTuitionFees: input.annualTuitionFees,
                currencyCode: input.prefferedCurrencyCode,
                requirementId: requirement.id,
            },
        });
        for (const addressId of input.addresses) {
            yield tx.addressCourse.create({
                data: {
                    addressId: addressId,
                    courseId: course.id,
                },
            });
        }
    }));
    return null;
});
exports.addCourse = addCourse;
const fetchGetCourseFields = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.courseField.findMany();
});
exports.fetchGetCourseFields = fetchGetCourseFields;
const fetchGetCourseLevels = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.courseLevel.findMany();
});
exports.fetchGetCourseLevels = fetchGetCourseLevels;
const updateCourse = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        console.log(input);
        // Fetch the existing course to ensure it exists
        const existingCourse = yield tx.course.findUnique({
            where: { id: input.id },
        });
        if (!existingCourse) {
            throw new Error(`Course with id ${input.id} does not exist.`);
        }
        // Update the course name if it's provided
        if (input.courseName) {
            let requirementId = existingCourse.requirementId;
            if (requirementId) {
                yield tx.universityRequirement.update({
                    where: {
                        id: requirementId,
                    },
                    data: {
                        pteRequirement: input.pteRequirement,
                        ieltsRequirement: input.ieltsRequirement,
                        toeflRequirement: input.toeflRequirement,
                        academicRequirement: input.academicRequirement,
                        scholarshipRequirement: input.scholarshipRequirement,
                        comments: input.requirementComments,
                        scholarshipAmount: input.scholarshipAmount,
                        otherRequirement: input.otherRequirement
                    },
                });
            }
            else {
                const requirement = yield tx.universityRequirement.create({
                    data: {
                        pteRequirement: input.pteRequirement,
                        ieltsRequirement: input.ieltsRequirement,
                        toeflRequirement: input.toeflRequirement,
                        academicRequirement: input.academicRequirement,
                        scholarshipRequirement: input.scholarshipRequirement,
                        comments: input.requirementComments,
                        otherRequirement: input.otherRequirement,
                        scholarshipAmount: input.scholarshipAmount,
                    },
                });
                requirementId = requirement.id;
            }
            const course = yield tx.course.update({
                where: { id: input.id },
                data: {
                    name: input.courseName,
                    countryId: input.countryId,
                    universityId: input.universityId,
                    intakes: input.intakes,
                    courseField: input.courseField,
                    courseLevel: input.courseLevel,
                    duration: input.duration,
                    annualTuitionFees: input.annualTuitionFees,
                    currencyCode: input.prefferedCurrencyCode,
                    requirementId: requirementId,
                },
                include: {
                    addresses: {
                        include: {
                            address: true,
                        },
                    },
                },
            });
            const existingAddresses = course.addresses.map((e) => e.address.id);
            const newIds = (_a = input.addresses) === null || _a === void 0 ? void 0 : _a.filter((a) => !existingAddresses.includes(a));
            const editIds = (_b = input.addresses) === null || _b === void 0 ? void 0 : _b.filter((a) => existingAddresses.includes(a));
            const exludedId = existingAddresses.filter((x) => { var _a; return !((_a = input.addresses) === null || _a === void 0 ? void 0 : _a.includes(x)); });
            // delete the course id from the address
            for (const addressId of exludedId) {
                yield tx.addressCourse.delete({
                    where: {
                        addressId_courseId: {
                            addressId: addressId,
                            courseId: course.id,
                        },
                    },
                });
            }
            // new ids to create
            for (const addressId of newIds !== null && newIds !== void 0 ? newIds : []) {
                yield tx.addressCourse.create({
                    data: {
                        addressId: addressId,
                        courseId: course.id,
                    },
                });
            }
        }
    }));
    return null;
});
exports.updateCourse = updateCourse;
// const getCourseIntakes = async (course: CourseFactoryType) => {
//   const universities = await Promise.all(course.universities.map(async (courseUni) => {
//     const courseUniversityIntakes = await prisma.courseUniversityIntake.findMany({
//       where: {
//         courseUniversityId: courseUni.id,
//       },
//       select: {
//         intake: {
//         }
//       }
//     })
//     return {
//       university: courseUni.university,
//       intakes: courseUniversityIntakes.map((i) => i.intake)
//     }
//   }))
//   return {
//     ...course,
//     universities
//   }
// }
const getCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma_1.prisma.course.findMany({
        select: {
            id: true,
            name: true,
            university: true,
            country: true,
            intakes: true,
            addresses: {
                select: {
                    address: true,
                },
            },
            requirement: true,
            annualTuitionFees: true,
            currencyCode: true,
            courseField: true,
            courseLevel: true,
            duration: true,
            description: true,
        },
    });
    const flattenedCourses = courses.map((course) => (Object.assign(Object.assign({}, course), { addresses: course.addresses.map((x) => x.address) })));
    return flattenedCourses;
});
exports.getCourses = getCourses;
const getCoursesByUniversity = (universityId) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma_1.prisma.course.findMany({
        where: {
            universityId: universityId,
        },
        select: {
            id: true,
            name: true,
            university: true,
            country: true,
            intakes: true,
            addresses: {
                include: {
                    address: true,
                },
            },
        },
    });
    const flattenedCourses = courses.map((course) => (Object.assign(Object.assign({}, course), { addresses: course.addresses.map((x) => x.address) })));
    return flattenedCourses;
});
exports.getCoursesByUniversity = getCoursesByUniversity;
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // await tx.courseUniversityIntake.deleteMany({
        //   where: {
        //     courseId: id,
        //   },
        // });
        yield tx.course.delete({
            where: {
                id: id,
            },
        });
    }));
});
exports.deleteCourse = deleteCourse;
