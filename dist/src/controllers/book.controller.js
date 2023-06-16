"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_model_1 = require("../models/schemas/book.model");
const author_model_1 = require("../models/schemas/author.model");
class BookController {
    static async createBook(req, res) {
        try {
            const authorNew = new author_model_1.Author({
                name: req.body.author
            });
            const bookNew = new book_model_1.Book({
                title: req.body.title,
                description: req.body.description,
                author: authorNew
            });
            bookNew.keywords.push({ keyword: req.body.keyword });
            const p1 = authorNew.save();
            const p2 = bookNew.save();
            let [author, book] = await Promise.all([p1, p2]);
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
            const book = await book_model_1.Book.findOne({ _id: req.params.id }).populate({
                path: 'author',
                select: 'name'
            });
            book.title = req.body.title;
            book.description = req.body.description;
            book.author[0].name = req.body.author;
            book.keywords[0].keyword = req.body.keyword;
            await book.save();
            await book.author[0].save();
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
            const books = await book_model_1.Book.find().populate({
                path: 'author',
                select: 'name'
            });
            res.render('listBook', { books: books });
        }
        catch (err) {
            res.render("error");
        }
    }
    static async getUpdateBookPage(req, res) {
        try {
            const book = await book_model_1.Book.findOne({ _id: req.params.id }).populate({
                path: 'author',
                select: 'name'
            });
            const author = book.author[0].name;
            if (book) {
                res.render('updateBook', { book: book, author });
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