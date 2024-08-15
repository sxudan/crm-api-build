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
exports.updateCountry = exports.getCountries = exports.deleteCountry = exports.addCountry = void 0;
const prisma_1 = require("../prisma");
const addCountry = (countryName, description) => __awaiter(void 0, void 0, void 0, function* () {
    const country = yield prisma_1.prisma.country.create({
        data: {
            name: countryName,
            description: description
        },
    });
    return country;
});
exports.addCountry = addCountry;
const updateCountry = (id, countryName, description) => __awaiter(void 0, void 0, void 0, function* () {
    const country = yield prisma_1.prisma.country.update({
        where: {
            id: id
        },
        data: {
            name: countryName,
            description: description
        },
    });
    return country;
});
exports.updateCountry = updateCountry;
const getCountries = () => __awaiter(void 0, void 0, void 0, function* () {
    const countries = yield prisma_1.prisma.country.findMany();
    return countries;
});
exports.getCountries = getCountries;
const deleteCountry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.country.delete({
        where: {
            id: id,
        },
    });
});
exports.deleteCountry = deleteCountry;
