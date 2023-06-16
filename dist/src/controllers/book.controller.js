"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_model_1 = require("../models/schemas/book.model");
class BookController {
    static async createBook(req, res) {
        try {
            const bookNew = new book_model_1.Book(req.body);
            bookNew.keywords.push({ keyword: req.body.keyword });
            const book = await bookNew.save();
            if (book) {
                res.render('success');
            }
            else {
                res.render('error');
            }
        }
        catch (err) {
            res.render('error');
        }
    }
    static async updateBook(req, res) {
        try {
            const book = await book_model_1.Book.findOne({ _id: req.params.id });
            book.title = req.body.title;
            book.description = req.body.description;
            book.author = req.body.author;
            await book.save();
            if (book) {
                res.render("success");
            }
            else {
                res.render("error");
            }
        }
        catch (err) {
            res.render("error");
        }
    }
    static async getListBook(req, res) {
        try {
            const books = await book_model_1.Book.find();
            console.log(books);
            res.render('listBook', { books: books });
        }
        catch (err) {
            res.render("error");
        }
    }
    static async getUpdateBookPage(req, res) {
        try {
            const book = await book_model_1.Book.findOne({ _id: req.params.id });
            if (book) {
                res.render('updateBook', { book: book });
            }
            else {
                res.render("error");
            }
        }
        catch (err) {
            res.render("error");
        }
    }
    static async deleteBook(req, res) {
        try {
            const book = await book_model_1.Book.findOne({ _id: req.params.id });
            if (book) {
                await book.deleteOne({ _id: req.params.id });
                res.status(200).json({ message: "Success!" });
            }
            else {
                res.render("error");
            }
        }
        catch (err) {
            res.render("error");
        }
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map