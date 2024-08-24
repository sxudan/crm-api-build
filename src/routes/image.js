"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRoutes = void 0;
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.imageRoutes = (0, express_1.Router)();
exports.imageRoutes.get("/:filename", (req, res, next) => {
    const { filename } = req.params;
    // Construct the full file path
    // const filePath = path.join(__dirname, "../..", "uploads", filename);
    const filePath = path_1.default.join(process.cwd(), 'uploads', filename);
    console.log(filePath);
    // Check if the file exists
    fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: "Image not found" });
        }
        // Set the correct content type (e.g., image/jpeg, image/png)
        res.sendFile(filePath);
    });
});
