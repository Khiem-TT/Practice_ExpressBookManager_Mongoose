import {Router} from "express";

const bookRoutes = Router();
import multer from "multer";
import {BookController} from "../controllers/book.controller";

const upload = multer();

bookRoutes.get('/create', (req, res) => {
    res.render('createBook');
});
bookRoutes.post('/create', upload.none(), BookController.createBook);
bookRoutes.post('/update/:id', upload.none(), BookController.updateBook);
bookRoutes.get('/list', BookController.getListBook);
bookRoutes.get('/update/:id', BookController.getUpdateBookPage);
bookRoutes.get('/delete/:id', BookController.deleteBook);

export default bookRoutes;