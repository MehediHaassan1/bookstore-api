/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import AppError from '../errors/AppError';
import { TErrorSourceList } from '../errors/interface';
import { ValidationError } from 'express-validator';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = err?.statusCode || 500;
    let message = err?.message || 'something went wrong';

    let errorSources: TErrorSourceList = [
        {
            path: '',
            message: '',
        },
    ];

    if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } 
    // else if (Array.isArray(err?.errors)) {
    //     // express-validator returns an array of errors
    //     statusCode = 400;
    //     message = 'Validation Error';
    //     errorSources = err.errors.map((error: ValidationError) => ({
    //         path: error,
    //         message: error.msg,
    //     }));
    // }
    // Handle duplicate key error (example for PostgreSQL)
    else if (err?.code === '23505') {
        // 23505 is PostgreSQL unique_violation
        statusCode = 400;
        message = 'Duplicate Entry';
        errorSources = [
            {
                path: '',
                message: err.detail || 'Duplicate key error',
            },
        ];
    } else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: err?.stack,
    });
};

export default globalErrorHandler;
