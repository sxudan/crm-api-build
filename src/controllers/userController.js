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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileImage = exports.updateUser = exports.deleteUser = exports.getUser = exports.getAllUsers = exports.addUser = void 0;
const prisma_1 = require("../prisma");
const crypto_1 = __importDefault(require("crypto"));
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = crypto_1.default
        .createHash("sha256")
        .update(user.password)
        .digest("hex");
    const admin = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const u = yield tx.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
            },
        });
        const profile = yield tx.profile.create({
            data: {
                userId: u.id,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: (_a = user.phone) !== null && _a !== void 0 ? _a : "",
                role: user.role,
                branchId: user.branchId,
                gender: user.gender,
                nationality: user.nationality,
                passportNumber: user.passportNumber,
                passportExpiryDate: user.passportExpiryDate ? new Date(user.passportExpiryDate) : undefined,
                nationalIdNumber: user.nationalIdNumber,
                educationalBackgroundFieldOfStudy: user.educationalBackgroundFieldOfStudy,
                educationalBackgroundLevelOfEduction: user.educationalBackgroundLevelOfEduction,
                educationalBackgroundYearOfGraduation: user.educationalBackgroundYearOfGraduation,
                educationalBackgroundCourse: user.educationalBackgroundCourse,
                educationalBackgroundNameOfInstitution: user.educationalBackgroundNameOfInstitution,
                socialLinkFacebook: user.socialLinkFacebook,
                socialLinkLinkedIn: user.socialLinkLinkedIn,
                socialLinkOther: user.socialLinkOther,
                employmentJobTitle: user.employmentJobTitle,
                employmentDepartment: user.employmentDepartment,
                employmentDateOfJoining: user.employmentDateOfJoining ? new Date(user.employmentDateOfJoining) : undefined,
                employmentEmployeeId: user.employmentEmployeeId,
                profileImage: user.profileImage
            },
        });
        const admin = {
            id: u.id,
            firstname: profile.firstname,
            lastname: profile.lastname,
            dob: profile.dob,
            phone: profile.phone,
            email: u.email,
            role: user.role,
            branchId: user.branchId,
            gender: user.gender,
            nationality: user.nationality,
            passportNumber: user.passportNumber,
            passportExpiryDate: user.passportExpiryDate ? new Date(user.passportExpiryDate) : undefined,
            nationalIdNumber: user.nationalIdNumber,
            educationalBackgroundFieldOfStudy: user.educationalBackgroundFieldOfStudy,
            educationalBackgroundLevelOfEduction: user.educationalBackgroundLevelOfEduction,
            educationalBackgroundYearOfGraduation: user.educationalBackgroundYearOfGraduation,
            educationalBackgroundCourse: user.educationalBackgroundCourse,
            educationalBackgroundNameOfInstitution: user.educationalBackgroundNameOfInstitution,
            socialLinkFacebook: user.socialLinkFacebook,
            socialLinkLinkedIn: user.socialLinkLinkedIn,
            socialLinkOther: user.socialLinkOther,
            employmentJobTitle: user.employmentJobTitle,
            employmentDepartment: user.employmentDepartment,
            employmentDateOfJoining: user.employmentDateOfJoining ? new Date(user.employmentDateOfJoining) : undefined,
            employmentEmployeeId: user.employmentEmployeeId,
            profileImage: user.profileImage
        };
        return admin;
    }));
    return admin;
});
exports.addUser = addUser;
const updateProfileImage = (profileId, profileImagePath) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.profile.update({
        where: {
            id: profileId
        },
        data: {
            profileImage: profileImagePath
        }
    });
});
exports.updateProfileImage = updateProfileImage;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        // Fetch the existing user to ensure it exists
        const existingUser = yield tx.user.findUnique({
            where: { id: user.id },
        });
        if (!existingUser) {
            throw new Error(`User with id ${user.id} does not exist.`);
        }
        // Hash the password if it needs to be updated
        const hashedPassword = user.password
            ? crypto_1.default.createHash('sha256').update(user.password).digest('hex')
            : undefined;
        // Update the user details
        yield tx.user.update({
            where: { id: user.id },
            data: {
                email: user.email,
                password: user.password ? hashedPassword : undefined,
            },
        });
        // Update the admin details if the user is an admin
        yield tx.profile.updateMany({
            where: { userId: user.id },
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                phone: (_b = user.phone) !== null && _b !== void 0 ? _b : "",
                role: user.role,
                branchId: user.branchId,
                gender: user.gender,
                nationality: user.nationality,
                passportNumber: user.passportNumber,
                passportExpiryDate: user.passportExpiryDate ? new Date(user.passportExpiryDate) : undefined,
                nationalIdNumber: user.nationalIdNumber,
                educationalBackgroundFieldOfStudy: user.educationalBackgroundFieldOfStudy,
                educationalBackgroundLevelOfEduction: user.educationalBackgroundLevelOfEduction,
                educationalBackgroundYearOfGraduation: user.educationalBackgroundYearOfGraduation,
                educationalBackgroundCourse: user.educationalBackgroundCourse,
                educationalBackgroundNameOfInstitution: user.educationalBackgroundNameOfInstitution,
                socialLinkFacebook: user.socialLinkFacebook,
                socialLinkLinkedIn: user.socialLinkLinkedIn,
                socialLinkOther: user.socialLinkOther,
                employmentJobTitle: user.employmentJobTitle,
                employmentDepartment: user.employmentDepartment,
                employmentDateOfJoining: user.employmentDateOfJoining ? new Date(user.employmentDateOfJoining) : undefined,
                employmentEmployeeId: user.employmentEmployeeId,
            },
        });
    }));
});
exports.updateUser = updateUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const u = yield prisma_1.prisma.profile.findUnique({
        where: {
            id: id,
        },
        include: {
            user: true,
        },
    });
    if (u == null) {
        return null;
    }
    const { user, role } = u, rest = __rest(u, ["user", "role"]);
    return Object.assign(Object.assign({}, rest), { role: role, email: user.email });
});
exports.getUser = getUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const profile = yield tx.profile.findUnique({
            where: {
                id: id
            }
        });
        yield tx.profile.delete({
            where: {
                id: id,
            },
        });
        yield tx.user.deleteMany({
            where: {
                id: profile === null || profile === void 0 ? void 0 : profile.userId
            },
        });
    }));
});
exports.deleteUser = deleteUser;
const getAllUsers = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield prisma_1.prisma.profile.findMany({
        where: {
            branchId: branchId,
        },
        include: {
            user: true,
        },
    });
    return admins.map((u) => {
        var _a;
        return ({
            id: u.id,
            firstname: u.firstname,
            lastname: u.lastname,
            dob: (_a = u.dob) !== null && _a !== void 0 ? _a : undefined,
            phone: u.phone,
            email: u.user.email,
            role: u.role,
        });
    });
});
exports.getAllUsers = getAllUsers;
