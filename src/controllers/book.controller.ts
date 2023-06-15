import {Book} from "../models/schemas/book.model";
import e from "express";

export class BookController {
    static async createBook(req, res) {
        try {
            const bookNew = new Book(req.body);
            const book = await bookNew.save();
            if (book) {
                res.render('success');
            } else {
                res.render('error');
            }
        } catch (err) {
            res.render('error');
        }
    }

    static async updateBook(req, res) {
        try {
            const book = await Book.findOne({_id: req.params.id});
            book.title = req.body.title;
            book.description = req.body.description;
            book.author = req.body.author;
            await book.save();
            if (book) {
                res.render("success");
            } else {
                res.render("error");
            }
        } catch (err) {
            res.render("error");
        }
    }

    static async getListBook(req, res) {
        try {
            const books = await Book.find();
            res.render('listBook', {books: books});
        } catch (err) {
            res.render("error");
        }
    }

    static async getUpdateBookPage(req, res) {
        try {
            const book = await Book.findOne({_id: req.params.id});
            if (book) {
                res.render('updateBook', {book: book});
            } else {
                res.render("error");
            }
        } catch (err) {
            res.render("error");
        }
    }

    static async deleteBook(req, res) {
        try {
            const book = await Book.findOne({_id: req.params.id});
            if (book) {
                await book.deleteOne({_id: req.params.id});
                res.status(200).json({message: "Success!"});
            } else {
                res.render("error");
            }
        } catch (err) {
            res.render("error");
        }
    }
}