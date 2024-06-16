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
exports.deleteVisaStatus = exports.updateVisaStatus = exports.getVisaStatusForCountry = exports.addVisaStatus = void 0;
const prisma_1 = require("../prisma");
const addVisaStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.visaStatus.create({
        data: {
            name: status.name,
            countryId: parseInt(status.countryId),
            order: status.order
        }
    });
});
exports.addVisaStatus = addVisaStatus;
const updateVisaStatus = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatePromises = input.statuses.map((status) => tx.visaStatus.update({
            where: { id: status.id },
            data: {
                name: status.name,
                order: status.order,
                countryId: status.countryId,
            },
        }));
        yield Promise.all(updatePromises);
    }));
});
exports.updateVisaStatus = updateVisaStatus;
const getVisaStatusForCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.visaStatus.findMany({
        where: {
            countryId: countryId
        }
    });
});
exports.getVisaStatusForCountry = getVisaStatusForCountry;
const deleteVisaStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.visaStatus.delete({
        where: {
            id: id
        }
    });
});
exports.deleteVisaStatus = deleteVisaStatus;
