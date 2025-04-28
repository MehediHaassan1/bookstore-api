import { body } from 'express-validator';

const createBook = [
    body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string'),
    body('published_date')
        .notEmpty()
        .withMessage('Published date is required')
        .isString()
        .withMessage('Published date must be a valid date'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('author_id').notEmpty().withMessage('Author id is required').isNumeric().withMessage('Author id must be a number'),
];

const updateBook = [
    body('title').optional().isString().withMessage('Title must be a string'),
    body('published_date')
        .optional()
        .isString()
        .withMessage('Published date must be a valid date'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('author_id').optional().isNumeric().withMessage('Author id must be a number'),
]

export const BookValidation = {
    createBook,
    updateBook,
};
