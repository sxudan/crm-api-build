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
exports.countryRoutes = void 0;
const express_1 = require("express");
const countryController_1 = require("../controllers/countryController");
exports.countryRoutes = (0, express_1.Router)();
exports.countryRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, currencyCode, currencySymbol } = req.body;
        const result = yield (0, countryController_1.addCountry)(name, description, currencyCode, currencySymbol);
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.countryRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, countryController_1.getCountries)();
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
exports.countryRoutes.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, countryController_1.deleteCountry)(parseInt(id));
        res.status(200).send({ success: true });
    }
    catch (e) {
        next(e);
    }
}));
exports.countryRoutes.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, currencyCode, currencySymbol } = req.body;
        const result = yield (0, countryController_1.updateCountry)(id, name, description, currencyCode, currencySymbol);
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
