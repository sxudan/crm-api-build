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
exports.universityRoutes = void 0;
const express_1 = require("express");
const universityController_1 = require("../controllers/universityController");
exports.universityRoutes = (0, express_1.Router)();
exports.universityRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield (0, universityController_1.addUniversity)(body);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.universityRoutes.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield (0, universityController_1.updateUniversity)(body);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.universityRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { countryId } = req.query;
        if (countryId) {
            const result = yield (0, universityController_1.getUniversitiesByCountry)(parseInt(countryId));
            res.status(200).send({ success: true, data: result });
        }
        else {
            const result = yield (0, universityController_1.getUniversities)();
            res.status(200).send({ success: true, data: result });
        }
    }
    catch (e) {
        next(e);
    }
}));
exports.universityRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, universityController_1.deleteUniversity)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}));
exports.universityRoutes.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const uni = yield (0, universityController_1.getUniversity)(parseInt(id));
        res.status(200).send({ success: true, data: uni });
    }
    catch (e) {
        next(e);
    }
}));
