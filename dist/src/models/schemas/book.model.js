"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.keywordSchema = void 0;
const mongoose_1 = require("mongoose");
exports.keywordSchema = new mongoose_1.Schema({
    keyword: String
});
const bookSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    author: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Author' }],
    keywords: [exports.keywordSchema]
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.model.js.map