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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.getAllUsers = exports.addUser = void 0;
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
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: hashedPassword,
                phone: (_a = user.phone) !== null && _a !== void 0 ? _a : "",
            },
        });
        yield tx.admin.create({
            data: {
                userId: u.id,
                roleId: user.userType,
                branchId: user.branchId,
            },
        });
        const admin = {
            id: u.id,
            firstname: u.firstname,
            lastname: u.lastname,
            dob: undefined,
            phone: u.phone,
            email: u.email,
            role: user.userType,
            branchId: user.branchId,
        };
        return admin;
    }));
    return admin;
});
exports.addUser = addUser;
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
            : existingUser.password;
        // Update the user details
        yield tx.user.update({
            where: { id: user.id },
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: hashedPassword,
                phone: (_b = user.phone) !== null && _b !== void 0 ? _b : "",
            },
        });
        // Update the admin details if the user is an admin
        yield tx.admin.updateMany({
            where: { userId: user.id },
            data: {
                roleId: user.userType,
                branchId: user.branchId,
            },
        });
    }));
});
exports.updateUser = updateUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const u = yield prisma_1.prisma.admin.findUnique({
        where: {
            userId: id,
        },
        include: {
            user: true,
            role: true,
        },
    });
    if (u == null) {
        return null;
    }
    return {
        id: u.user.id,
        firstname: u.user.firstname,
        lastname: u.user.lastname,
        dob: (_c = u.user.dob) !== null && _c !== void 0 ? _c : undefined,
        phone: u.user.phone,
        email: u.user.email,
        role: u.role.id,
    };
});
exports.getUser = getUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.admin.delete({
            where: {
                userId: id,
            },
        });
        yield tx.user.delete({
            where: {
                id: id,
            },
        });
    }));
});
exports.deleteUser = deleteUser;
const getAllUsers = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield prisma_1.prisma.admin.findMany({
        where: {
            branchId: branchId,
        },
        include: {
            user: true,
            role: true,
        },
    });
    return admins.map((u) => {
        var _a;
        return ({
            id: u.user.id,
            firstname: u.user.firstname,
            lastname: u.user.lastname,
            dob: (_a = u.user.dob) !== null && _a !== void 0 ? _a : undefined,
            phone: u.user.phone,
            email: u.user.email,
            role: u.role.id,
        });
    });
});
exports.getAllUsers = getAllUsers;
