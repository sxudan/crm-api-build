"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const error_1 = require("./middlewares/error");
const routes_1 = require("./routes");
dotenv_1.default.config();
const startServer = () => {
    const app = (0, express_1.default)();
    // Apply middleware
    (0, middlewares_1.applyMiddleware)(app);
    app.use((0, cors_1.default)());
    // Apply routes
    app.use('/api', routes_1.router);
    app.use(error_1.errorHandler);
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
exports.startServer = startServer;
(0, exports.startServer)();
