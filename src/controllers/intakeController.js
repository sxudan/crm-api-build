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
exports.updateIntake = exports.deleteIntake = exports.getIntakes = exports.addIntake = exports.createIntake = void 0;
const prisma_1 = require("../prisma");
const addIntake = (intakeInput, courseId, universityId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // const courseuniversity =  await tx.courseUniversity.findMany({
        //     where: {
        //         courseId: courseId,
        //         universityId:universityId,
        //     },
        // })
        const intake = yield tx.intake.create({
            data: {
                startDate: intakeInput.startDate,
                endDate: intakeInput.endDate,
                title: intakeInput.title
            }
        });
        yield tx.courseUniversityIntake.create({
            data: {
                courseId: courseId,
                intakeId: intake.id
            }
        });
    }));
});
exports.addIntake = addIntake;
const createIntake = (intakeInput) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.intake.create({
        data: {
            startDate: intakeInput.startDate,
            endDate: intakeInput.endDate,
            title: intakeInput.title
        }
    });
});
exports.createIntake = createIntake;
const updateIntake = (intakeInput) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.intake.update({
        where: {
            id: intakeInput.id
        },
        data: {
            startDate: intakeInput.startDate,
            endDate: intakeInput.endDate,
            title: intakeInput.title
        }
    });
});
exports.updateIntake = updateIntake;
const getIntakes = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.intake.findMany();
});
exports.getIntakes = getIntakes;
const deleteIntake = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.courseUniversityIntake.deleteMany({
            where: {
                intakeId: id
            }
        });
        yield tx.intake.delete({
            where: {
                id: id
            }
        });
    }));
});
exports.deleteIntake = deleteIntake;
