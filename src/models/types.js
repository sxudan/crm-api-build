"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionTypes = exports.LanguageTypes = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles[Roles["Superadmin"] = 1] = "Superadmin";
    Roles[Roles["Counsellor"] = 2] = "Counsellor";
    Roles[Roles["Frontdesk"] = 3] = "Frontdesk";
    Roles[Roles["Account"] = 4] = "Account";
})(Roles || (exports.Roles = Roles = {}));
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
