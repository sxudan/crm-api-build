"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolemanagercontroller_1 = require("../controllers/rolemanagercontroller");
const accessMiddleware = (req, res, next) => {
    var _a;
    const accessManagement = (0, rolemanagercontroller_1.fetchConfiguration)().accessManagement;
    const currentRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (!currentRole) {
        return res.status(401).json({ message: "Unknown user" });
    }
    const feature = req.featureName;
    if (!feature) {
        return res.status(401).json({ message: "Invalid feature" });
    }
    const access = accessManagement[feature][currentRole];
    if (req.method == "GET" && access.READ) {
        next();
    }
    else if ((req.method == "POST" || req.method == "PUT") && access.WRITE) {
        next();
    }
    else if (req.method == "DELETE" && access.DELETE) {
        next();
    }
    else {
        return res.status(500).json({ message: "Invalid access" });
    }
};
exports.default = accessMiddleware;
