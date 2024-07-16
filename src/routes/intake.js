"use strict";
// import { Router } from "express";
// import {
//   addCourse,
//   deleteCourse,
//   getCourses,
//   getCoursesByUniversity,
//   updateCourse,
// } from "../controllers/courseController";
// import { addIntake, createIntake, deleteIntake, getIntakes, updateIntake } from "../controllers/intakeController";
// import { IntakeEditInput, IntakeInput } from "../models/intake";
// export const intakeRoutes = Router();
// intakeRoutes.post("/", async (req, res, next) => {
//   try {
//     const input = req.body as IntakeInput;
//     await createIntake(input)
//     res.status(200).send({ success: true, data: null });
//   } catch (e) {
//     next(e);
//   }
// });
// intakeRoutes.put("/", async (req, res, next) => {
//   try {
//     const input = req.body as IntakeEditInput;
//     const result = await updateIntake(input);
//     res.status(200).send({ success: true, data: result });
//   } catch (e) {
//     next(e);
//   }
// });
// intakeRoutes.get("/", async (req, res, next) => {
//   try {
//     const result = await getIntakes()
//     res.status(200).send({ success: true, data: result });
//   } catch (e) {
//     next(e);
//   }
// });
// intakeRoutes.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await deleteIntake(parseInt(id));
//     res.status(200).send({ success: true });
//   } catch (e) {
//     next(e);
//   }
// });
