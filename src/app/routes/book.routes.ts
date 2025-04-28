import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "../controllers/book.controller";
import { BookValidation } from "../validations/book.validation";

const router = Router();

router.post(
    '/',
    validateRequest(BookValidation.createBook),
    BookController.createBook
)

router.get(
    '/',
    BookController.getAllBooks
)

router.get(
    '/:id',
    BookController.getBookById
)

router.put(
    '/:id',
    validateRequest(BookValidation.updateBook),
    BookController.updateBook
)

router.delete(
    '/:id',
    BookController.deleteBookById
)

export const BookRoutes = router;