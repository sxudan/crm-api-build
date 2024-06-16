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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userController_1 = require("../controllers/userController");
const authMiddleware = (req, res, next) => {
    var _a;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access token is missing" });
    }
    const token = authHeader.split(" ")[1].trim(); // Assuming the token is in the format "Bearer token"
    const secretKey = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access token is missing or invalid" });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: "Invalid access token" });
        }
        const userId = decoded["userId"];
        // if not exist
        if (!userId) {
            console.log('invalid userid');
            return res.status(401).json({ message: "Invalid access token" });
        }
        const user = yield (0, userController_1.getUser)(parseInt(userId));
        if (!user) {
            console.log('user doesnot exist');
            return res.status(401).json({ message: "Invalid access token" });
        }
        req.user = user;
        next();
    }));
};
exports.default = authMiddleware;
