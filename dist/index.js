"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = require("./src/models/data-source");
const book_router_1 = __importDefault(require("./src/router/book.router"));
const port = 8000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', './src/views');
data_source_1.Database.connectDB()
    .then(() => console.log('DB connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use(body_parser_1.default.json());
app.use('/book', book_router_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map