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
exports.configRoutes = void 0;
const express_1 = require("express");
const rolemanagercontroller_1 = require("../controllers/rolemanagercontroller");
exports.configRoutes = (0, express_1.Router)();
exports.configRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, rolemanagercontroller_1.fetchConfiguration)();
        res.status(200).send({ success: true, data: result });
    }
    catch (e) {
        next(e);
    }
}));
