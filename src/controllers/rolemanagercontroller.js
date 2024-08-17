"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchConfiguration = exports.Access = void 0;
const client_1 = require("@prisma/client");
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
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Countries]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Universities]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Courses]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Leads]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Language]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Applicants]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Users]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.Tasks]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.VisaStatus]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
        },
        [featurelists_1.Features.SubAgent]: {
            [client_1.Roles.Superadmin]: allAccess,
            [client_1.Roles.Counsellor]: readAccessOnly,
            [client_1.Roles.Frontdesk]: readAccessOnly,
            [client_1.Roles.Account]: readAccessOnly,
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
