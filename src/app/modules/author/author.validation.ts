import { body } from 'express-validator';

const createAuthor = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    body('birthdate')
        .notEmpty()
        .withMessage('Birthdate is required')
        .isDate()
        .withMessage('Birthdate must be a valid date'),
    body('bio').optional(),
];

const updateAUthor = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('birthdate').optional().isDate().withMessage('Birthdate must be a valid date'),
    body('bio').optional().isString().withMessage('Bio must be a string'),
];

export const AuthorValidation = {
    createAuthor,
    updateAUthor,
};
