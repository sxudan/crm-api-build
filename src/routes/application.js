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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = void 0;
const express_1 = require("express");
const applicationController_1 = require("../controllers/applicationController");
const multer_1 = __importDefault(require("../utils/multer"));
exports.applicationRoutes = (0, express_1.Router)();
exports.applicationRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const result = yield (0, applicationController_1.addApplicant)(input);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const result = yield (0, applicationController_1.updateApplicant)(input);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.put("/status", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicantId, statusId } = req.body;
        const result = yield (0, applicationController_1.updateApplicantStatus)(applicantId, statusId);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, applicationController_1.getApplicants)();
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield (0, applicationController_1.getApplicant)(parseInt(id));
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.post('/uploadImage', multer_1.default.single('profileImage'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { applicationId } = req.body;
        const url = `${process.env.BASE_URL}/image/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        if (applicationId) {
            yield (0, applicationController_1.updateProfileImage)(parseInt(applicationId), url);
        }
        res.status(200).json({ success: true, data: url });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.post("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchText, visaStatusIds, isDirect, intake, years, country, institution, course, intakes } = req.body;
        const result = yield (0, applicationController_1.searchApplicants)(searchText, visaStatusIds, isDirect, intake, years, country ? parseInt(country) : undefined, institution ? parseInt(institution) : undefined, course ? parseInt(course) : undefined, intakes);
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.applicationRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(`deleting ${id}`);
        yield (0, applicationController_1.deleteApplicant)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
