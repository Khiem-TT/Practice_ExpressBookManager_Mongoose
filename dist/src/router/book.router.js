"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const book_controller_1 = require("../controllers/book.controller");
const upload = (0, multer_1.default)();
bookRoutes.get('/create', (req, res) => {
    res.render('createBook');
});
bookRoutes.post('/create', upload.none(), book_controller_1.BookController.createBook);
bookRoutes.post('/update/:id', upload.none(), book_controller_1.BookController.updateBook);
bookRoutes.get('/list', book_controller_1.BookController.getListBook);
bookRoutes.get('/update/:id', book_controller_1.BookController.getUpdateBookPage);
bookRoutes.get('/delete/:id', book_controller_1.BookController.deleteBook);
exports.default = bookRoutes;
//# sourceMappingURL=book.router.js.map