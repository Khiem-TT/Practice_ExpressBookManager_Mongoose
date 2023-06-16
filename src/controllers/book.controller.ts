import {Book} from "../models/schemas/book.model";
import {Author} from "../models/schemas/author.model";

export class BookController {
    static async createBook(req, res) {
        try {
            const authorNew = new Author({
                name: req.body.author
            });
            const bookNew = new Book({
                title: req.body.title,
                description: req.body.description,
                author: authorNew
            });
            bookNew.keywords.push({keyword: req.body.keyword});
            const p1 = authorNew.save();
            const p2 = bookNew.save();
            let [author, book] = await Promise.all([p1, p2]);
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
            const book = await Book.findOne({_id: req.params.id}).populate({
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
            } else {
                res.render("error");
            }
        } catch (err) {
            res.render("error");
        }
    }

    static async getListBook(req, res) {
        try {
            let query = {};
            if (req.query.keyword && req.query.keyword != '') {
                let keywordFind = req.query.keyword || '';
                query = {
                    "keywords.keyword": {
                        $regex: keywordFind
                    }
                }
            }
            const books = await Book.find(query).populate({
                path: 'author',
                select: 'name'
            });
            res.render('listBook', {books: books});
        } catch (err) {
            res.render("error");
        }
    }

    static async getUpdateBookPage(req, res) {
        try {
            const book = await Book.findOne({_id: req.params.id}).populate({
                path: 'author',
                select: 'name'
            });
            // @ts-ignore
            const author = book.author[0].name;
            if (book) {
                res.render('updateBook', {book: book, author});
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