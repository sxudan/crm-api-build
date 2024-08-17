"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionTypes = exports.LanguageTypes = void 0;
var LanguageTypes;
(function (LanguageTypes) {
    LanguageTypes[LanguageTypes["IELTS"] = 1] = "IELTS";
    LanguageTypes[LanguageTypes["PTE"] = 2] = "PTE";
})(LanguageTypes || (exports.LanguageTypes = LanguageTypes = {}));
var AdmissionTypes;
(function (AdmissionTypes) {
    AdmissionTypes[AdmissionTypes["Class"] = 1] = "Class";
    AdmissionTypes[AdmissionTypes["Booking"] = 2] = "Booking";
})(AdmissionTypes || (exports.AdmissionTypes = AdmissionTypes = {}));
// export const ApplicationStatusLabel = {
//   [ApplicationStatus.Offer_Applied]: 'Offer Applied',
//   [ApplicationStatus.Offer_Received]: 'Offer Received',
//   [ApplicationStatus.Taking_Class]: 'Taking Class',
//   [ApplicationStatus.Visa_Applied]: 'Visa Applied',
// }
