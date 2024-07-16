"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = mongoose_1.default.connection;
db.once("open", () => console.log("DB connected"));
db.on("error", (error) => console.error(error));
const url = process.env.DB_URL;
mongoose_1.default.connect(url).then(() => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use('/auth', auth_routes_1.default);
    app.listen(3000, () => console.log("app is listening"));
});
//# sourceMappingURL=server.js.map