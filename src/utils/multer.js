"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Define custom storage for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Use a relative path to the current directory
        const uploadDir = path_1.default.join(process.cwd(), 'uploads');
        // Ensure the upload directory exists
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate a custom filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path_1.default.extname(file.originalname); // Get the file extension
        const baseName = path_1.default.basename(file.originalname, ext).replace(/[\s\u00A0]+/g, ''); // Get the file name without the extension
        // Customize the file name format
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    }
});
// Multer upload middleware using the custom storage configuration
const upload = (0, multer_1.default)({ storage });
// Export the upload middleware if needed for your routes
exports.default = upload;
