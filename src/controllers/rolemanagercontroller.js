"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConfiguration = exports.Access = void 0;
const types_1 = require("../models/types");
const featurelists_1 = require("../utils/featurelists");
var Access;
(function (Access) {
    Access["READ"] = "READ";
    Access["WRITE"] = "WRITE";
    Access["DELETE"] = "DELETE";
})(Access || (exports.Access = Access = {}));
const allAccess = {
    [Access.DELETE]: true,
    [Access.WRITE]: true,
    [Access.READ]: true,
};
const readAccessOnly = {
    [Access.DELETE]: false,
    [Access.WRITE]: false,
    [Access.READ]: true,
};
const writeAccessOnly = {
    [Access.DELETE]: false,
    [Access.WRITE]: true,
    [Access.READ]: false,
};
const readWriteAccess = {
    [Access.DELETE]: false,
    [Access.WRITE]: true,
    [Access.READ]: true,
};
const deleteAccessOnly = {
    [Access.DELETE]: true,
    [Access.WRITE]: false,
    [Access.READ]: false,
};
const noAccess = {
    [Access.DELETE]: false,
    [Access.WRITE]: false,
    [Access.READ]: false,
};
const fetchAccessConfiguration = () => {
    return {
        [featurelists_1.Features.Dashboard]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Countries]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Universities]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Courses]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Leads]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Language]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Applicants]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Users]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Tasks]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.VisaStatus]: {
            [types_1.Roles.Superadmin]: allAccess,
            [types_1.Roles.Counsellor]: readAccessOnly,
            [types_1.Roles.Frontdesk]: readAccessOnly,
            [types_1.Roles.Account]: readAccessOnly,
        }
    };
};
const fetchConfiguration = () => {
    let features = [];
    for (const feature in featurelists_1.Features) {
        features.push(feature);
    }
    return {
        accessManagement: fetchAccessConfiguration(),
        featureList: features,
    };
};
exports.fetchConfiguration = fetchConfiguration;
