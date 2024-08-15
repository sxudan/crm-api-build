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
exports.signup = exports.login = void 0;
// import bcrypt from 'bcrypt';
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exception_1 = require("../models/exception");
const prisma_1 = require("../prisma");
const constants_1 = require("../utils/constants");
const generateTokens = (id, role) => {
    var _a, _b;
    const accessToken = jsonwebtoken_1.default.sign({ userId: id, userType: role }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "", {
        expiresIn: "7d",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userId: id }, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "", {
        expiresIn: "7d",
    });
    return {
        accessToken,
        refreshToken,
    };
};
const login = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const u = yield prisma_1.prisma.profile.findFirst({
        where: {
            user: {
                email: credential.email,
            },
            roleId: credential.userType,
        },
        include: {
            role: true,
            user: true,
        },
    });
    if (u) {
        const user = u.user;
        const hashed = crypto_1.default
            .createHash("sha256")
            .update(credential.password)
            .digest("hex");
        console.log(hashed);
        if (hashed == user.password) {
            const admin = {
                id: u.userId,
                email: user.email,
                role: u.roleId,
                branchId: u.branchId,
            };
            return Object.assign(Object.assign({}, generateTokens(u.userId, u.roleId)), { user: admin });
        }
        else {
            console.log("incorrect password");
            throw new exception_1.AuthException();
        }
    }
    else {
        console.log("User doesnot exist");
        throw new exception_1.AuthException();
    }
});
exports.login = login;
const signup = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUsers = yield prisma_1.prisma.user.findFirst({
        where: {
            email: user.email,
        },
    });
    if (existedUsers) {
        throw new exception_1.AuthException();
    }
    const hashedPassword = crypto_1.default
        .createHash("sha256")
        .update(user.password)
        .digest("hex");
    const response = yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const u = yield tx.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
            },
        });
        console.log(user);
        const profile = yield tx.profile.create({
            data: {
                firstname: user.firstname,
                lastname: user.lastname,
                userId: u.id,
                dob: user.dob ? new Date(user.dob) : undefined,
                phone: user.phone,
                roleId: user.userType,
                branchId: constants_1.Branch.KamalPokhari
            }
        });
        const admin = {
            id: u.id,
            firstname: profile.firstname,
            lastname: profile.lastname,
            dob: (_b = (_a = profile.dob) === null || _a === void 0 ? void 0 : _a.getDate()) !== null && _b !== void 0 ? _b : null,
            phone: profile.phone,
            email: u.email,
            role: user.userType,
            branchId: user.branchId,
        };
        return Object.assign(Object.assign({}, generateTokens(u.id, user.userType)), { user: admin });
    }));
    return response;
});
exports.signup = signup;
