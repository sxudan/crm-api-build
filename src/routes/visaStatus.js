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
exports.visaStatusRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const access_1 = __importDefault(require("../middlewares/access"));
const visaStatusController_1 = require("../controllers/visaStatusController");
exports.visaStatusRoutes = (0, express_1.Router)();
exports.visaStatusRoutes.post("/", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield (0, visaStatusController_1.addVisaStatus)(body);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.visaStatusRoutes.put("/", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        yield (0, visaStatusController_1.updateVisaStatus)(body);
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.visaStatusRoutes.get("/", auth_1.default, access_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { countryId } = req.query;
        if (countryId) {
            const result = yield (0, visaStatusController_1.getVisaStatusForCountry)(parseInt(countryId));
            res.status(200).send({ success: true, data: result });
        }
        else {
            const result = yield (0, visaStatusController_1.getVisaStatuses)();
            res.status(200).send({ success: true, data: result });
        }
    }
    catch (e) {
        console.log();
        next(e);
    }
}));
exports.visaStatusRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, visaStatusController_1.deleteVisaStatus)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
