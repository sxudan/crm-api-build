"use strict";
// import { IntakeEditInput, IntakeInput } from "../models/intake";
// import { prisma } from "../prisma";
// const addIntake = async (intakeInput: IntakeInput, courseId: number, universityId: number) => {
//     await prisma.$transaction(async (tx) => {
//         // const courseuniversity =  await tx.courseUniversity.findMany({
//         //     where: {
//         //         courseId: courseId,
//         //         universityId:universityId,
//         //     },
//         // })
//         const intake = await tx.intake.create({
//             data: {
//                 startDate: intakeInput.startDate,
//                 endDate: intakeInput.endDate,
//                 title: intakeInput.title
//             }
//         })
//         await tx.courseUniversityIntake.create({
//             data: {
//                 courseId: courseId,
//                 intakeId: intake.id
//             }
//         })
//     })
// }
// const createIntake = async (intakeInput: IntakeInput) => {
//     await prisma.intake.create({
//         data: {
//             startDate: intakeInput.startDate,
//             endDate: intakeInput.endDate,
//             title: intakeInput.title
//         }
//     })
// }
// const updateIntake = async (intakeInput: IntakeEditInput) => {
//     await prisma.intake.update({
//         where: {
//             id: intakeInput.id
//         },
//         data: {
//             startDate: intakeInput.startDate,
//             endDate: intakeInput.endDate,
//             title: intakeInput.title
//         }
//     })
// }
// const getIntakes = async () => {
//     return prisma.intake.findMany()
// }
// const deleteIntake = async (id: number) => {
//     await prisma.$transaction(async (tx) => {
//         await tx.courseUniversityIntake.deleteMany({
//             where: {
//                 intakeId: id
//             }
//         })
//         await tx.intake.delete({
//             where: {
//                 id: id
//             }
//         })
//     })
// }
// export {
//     createIntake,
//     addIntake,
//     getIntakes,
//     deleteIntake,
//     updateIntake
// }
