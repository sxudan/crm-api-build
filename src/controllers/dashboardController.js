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
exports.getDashboardDataByCountry = exports.getDashboardData = void 0;
const applicationController_1 = require("./applicationController");
const leadController_1 = require("./leadController");
const visaStatusController_1 = require("./visaStatusController");
const getDashboardData = () => __awaiter(void 0, void 0, void 0, function* () {
    const statuses = (yield (0, visaStatusController_1.getVisaStatuses)()).filter(x => x.name.toLowerCase() === 'visa granted').map(x => x.id);
    return {
        leads: {
            total: yield (0, leadController_1.getLeadCount)(),
            thisMonth: yield (0, leadController_1.getLeadCount)(new Date())
        },
        applicants: {
            total: yield (0, applicationController_1.getApplicationCount)(),
            thisMonth: yield (0, applicationController_1.getApplicationCount)(new Date()),
        },
        languages: {
            total: 0,
            thisMonth: 0,
        },
        visaGranted: {
            total: yield (0, applicationController_1.getApplicationCount)(undefined, statuses),
            thisMonth: yield (0, applicationController_1.getApplicationCount)(new Date(), statuses),
        }
    };
});
exports.getDashboardData = getDashboardData;
const getDashboardDataByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    const statuses = (yield (0, visaStatusController_1.getVisaStatuses)()).filter(x => x.name.toLowerCase() === 'visa granted' || x.name.toLowerCase() === 'visa grant').map(x => x.id);
    return {
        leads: {
            total: yield (0, leadController_1.getLeadCount)(undefined, countryId),
            thisMonth: yield (0, leadController_1.getLeadCount)(new Date())
        },
        applicants: {
            total: yield (0, applicationController_1.getApplicationCount)(undefined, undefined, countryId),
            thisMonth: yield (0, applicationController_1.getApplicationCount)(new Date(), undefined, countryId),
        },
        languages: {
            total: 0,
            thisMonth: 0,
        },
        visaGranted: {
            total: yield (0, applicationController_1.getApplicationCount)(undefined, statuses, countryId),
            thisMonth: yield (0, applicationController_1.getApplicationCount)(new Date(), statuses, countryId),
        }
    };
});
exports.getDashboardDataByCountry = getDashboardDataByCountry;
