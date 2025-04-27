import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthorValidation } from "./author.validation";
import { AuthorController } from "./author.controller";

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