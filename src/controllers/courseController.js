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
exports.getCoursesByUniversity = exports.updateCourse = exports.getCourses = exports.deleteCourse = exports.addCourse = void 0;
const prisma_1 = require("../prisma");
const addCourse = (courseName, universityId, intakes) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield tx.course.create({
            data: {
                name: courseName,
                universityId: universityId,
                intakes: intakes
            },
        });
        // for(let intakeId of intakeIds) {
        //   await tx.courseUniversityIntake.create({
        //     data: {
        //       intakeId: intakeId,
        //       courseId: course.id
        //     }
        //   })
        // }
    }));
    return null;
});
exports.addCourse = addCourse;
const updateCourse = (courseId, courseName, universityId, intakes) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Fetch the existing course to ensure it exists
        const existingCourse = yield tx.course.findUnique({
            where: { id: courseId },
        });
        if (!existingCourse) {
            throw new Error(`Course with id ${courseId} does not exist.`);
        }
        // Update the course name if it's provided
        if (courseName) {
            yield tx.course.update({
                where: { id: courseId },
                data: { name: courseName, universityId: universityId, intakes: intakes },
            });
        }
        // Update the associated universities if they're provided
        // if (universityId) {
        //   // Remove existing associations
        //   await tx.courseUniversityIntake.deleteMany({
        //     where: { courseId: courseId },
        //   });
        //   // Add new associations
        //   for (const id of intakeIds ?? []) {
        //     await tx.courseUniversityIntake.create({
        //       data: {
        //         courseId: courseId,
        //         intakeId: id,
        //       },
        //     });
        //   }
        // }
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
            intakes: true
        },
    });
    const flattenedCourses = courses.map((course) => (Object.assign({}, course)));
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
            intakes: true
        },
    });
    const flattenedCourses = courses.map((course) => (Object.assign({}, course)));
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
