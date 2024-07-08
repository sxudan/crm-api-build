"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("./auth");
const country_1 = require("./country");
const course_1 = require("./course");
const profile_1 = require("./profile");
const university_1 = require("./university");
const lead_1 = require("./lead");
const language_1 = require("./language");
const users_1 = require("./users");
const task_1 = require("./task");
const configuration_1 = require("./configuration");
const featurelists_1 = require("../utils/featurelists");
const application_1 = require("./application");
const intake_1 = require("./intake");
const visaStatus_1 = require("./visaStatus");
const subAgent_1 = require("./subAgent");
const featureMap = {
    "/country": featurelists_1.Features.Countries,
    "/university": featurelists_1.Features.Universities,
    "/course": featurelists_1.Features.Courses,
    "/lead": featurelists_1.Features.Leads,
    "/language": featurelists_1.Features.Language,
    "/user": featurelists_1.Features.Users,
    "/task": featurelists_1.Features.Tasks,
    "/application": featurelists_1.Features.Applicants,
    "/visastatus": featurelists_1.Features.VisaStatus,
    "/subagent": featurelists_1.Features.SubAgent,
};
const featureName = (req, res, next) => {
    const url = req.baseUrl.replace("/api", "");
    req.featureName = featureMap[url];
    next();
};
// Combine all route handlers
exports.router = (0, express_1.Router)();
exports.routes = exports.router;
exports.router.use("/auth", auth_1.authRoutes);
exports.router.use("/country", featureName, country_1.countryRoutes);
exports.router.use("/profile", profile_1.profileRoutes);
exports.router.use("/university", featureName, university_1.universityRoutes);
exports.router.use("/course", featureName, course_1.courseRoutes);
exports.router.use("/lead", featureName, lead_1.leadRoutes);
exports.router.use("/language", featureName, language_1.languageRoutes);
exports.router.use("/user", featureName, users_1.userRoutes);
exports.router.use("/task", featureName, task_1.taskRoutes);
exports.router.use("/configuration", configuration_1.configRoutes);
exports.router.use("/application", featureName, application_1.applicationRoutes);
exports.router.use("/intake", featureName, intake_1.intakeRoutes);
exports.router.use("/visastatus", featureName, visaStatus_1.visaStatusRoutes);
exports.router.use("/subagent", featureName, subAgent_1.subAgentRouter);
