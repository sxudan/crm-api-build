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
exports.courseRoutes = void 0;
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
exports.courseRoutes = (0, express_1.Router)();
exports.courseRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield (0, courseController_1.addCourse)(body);
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.courseRoutes.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const result = yield (0, courseController_1.updateCourse)(body);
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.courseRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { universityId } = req.query;
        if (universityId) {
            const result = yield (0, courseController_1.getCoursesByUniversity)(parseInt(universityId));
            res.status(200).send({ success: true, data: result });
        }
        else {
            const result = yield (0, courseController_1.getCourses)();
            res.status(200).send({ success: true, data: result });
        }
    }
    catch (e) {
        next(e);
    }
}));
exports.courseRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, courseController_1.deleteCourse)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.courseRoutes.get("/courseFields", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = yield (0, courseController_1.fetchGetCourseFields)();
        res.status(200).send({ success: true, data: fields });
    }
    catch (e) {
        next(e);
    }
}));
exports.courseRoutes.get("/courseLevels", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = yield (0, courseController_1.fetchGetCourseLevels)();
        res.status(200).send({ success: true, data: fields });
    }
    catch (e) {
        next(e);
    }
}));
// new
// courseRoutes.post("/courseFields/add", async (req, res, next) => {
//   try {
//     // const data = req.body as NameC
//     // const fields = await addCourseField()
//     res.status(200).send({ success: true, data: fields });
//   } catch (e) {
//     next(e);
//   }
// });
// courseRoutes.post("/courseLevels/add", async (req, res, next) => {
//   try {
//     const fields = await fetchGetCourseLevels()
//     res.status(200).send({ success: true, data: fields });
//   } catch (e) {
//     next(e);
//   }
// });
// courseRoutes.put("/courseFields/update", async (req, res, next) => {
//   try {
//     const fields = await fetchGetCourseFields()
//     res.status(200).send({ success: true, data: fields });
//   } catch (e) {
//     next(e);
//   }
// });
// courseRoutes.put("/courseLevels/update", async (req, res, next) => {
//   try {
//     const fields = await fetchGetCourseLevels()
//     res.status(200).send({ success: true, data: fields });
//   } catch (e) {
//     next(e);
//   }
// });
// courseRoutes.delete("/courseFields/delete", async (req, res, next) => {
//   try {
//     const fields = await fetchGetCourseFields()
//     res.status(200).send({ success: true, data: fields });
//   } catch (e) {
//     next(e);
//   }
// });
// courseRoutes.delete("/courseLevels/delete", async (req, res, next) => {
//   try {
//     const fields = await fetchGetCourseLevels()
//     res.status(200).send({ success: true, data: fields });
//   } catch (e) {
//     next(e);
//   }
// });
