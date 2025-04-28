import { Router } from "express";
import { AuthorValidation } from "../validations/author.validation";
import { AuthorController } from "../controllers/author.controller";
import validateRequest from "../../middlewares/validateRequest";


const router = Router();

// create new author
router.post(
    '/',
    validateRequest(AuthorValidation.createAuthor),
    AuthorController.createAuthor
)

// get authors
router.get(
    '/',
    AuthorController.getAuthors
)

// get author
router.get(
    '/:id',
    AuthorController.getAuthor
)

// update author
router.put(
    '/:id',
    validateRequest(AuthorValidation.updateAUthor),
    AuthorController.updateAuthor
)

// delete author
router.delete(
    '/:id',
    AuthorController.deleteAuthor
)

export const AuthorRoutes = router;