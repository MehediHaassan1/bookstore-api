import status from 'http-status';
import db from '../../config/db';
import AppError from '../../errors/AppError';
import { IAuthor, IAuthorFilterRequest } from '../../interfaces/author.interface';
import { IOptions } from '../../interfaces/pagination.interface';
import pagination from '../../utils/pagination';
import { authorSearchFields } from '../constant/author.constant';

const createAuthorIntoDB = async (data: IAuthor) => {
    const [newAuthor] = await db('authors').insert(data).returning('*');
    return newAuthor;
};

const getAuthorsFromDB = async (params: IAuthorFilterRequest, options: IOptions) => {
    const { page, limit } = pagination(options);
    const { searchTerm } = params;
    const offset = (page - 1) * limit;

    const query = db('authors').select('*');

    if (searchTerm) {
        query.where((builder) => {
            authorSearchFields.forEach((field) => {
                builder.orWhere(field, 'ilike', `%${searchTerm}%`);
            });
        });
    }

    query.limit(limit).offset(offset);
    const authors = await query;

    const total = await db('authors')
        .count('* as count')
        .modify((qb) => {
            if (searchTerm) {
                qb.where((builder) => {
                    authorSearchFields.forEach((field) => {
                        builder.orWhere(field, 'ilike', `%${searchTerm}%`);
                    });
                });
            }
        })
        .first();

    return {
        meta: {
            page,
            limit,
            total: total?.count || 0,
            totalPage: Math.ceil((total?.count || 0) / limit),
        },
        data: authors,
    };
};

const getAuthorFromDB = async (id: string) => {
    const author = await db('authors').where({ id }).first();
    return author;
};

const updateAuthorIntoDB = async (id: string, data: Partial<IAuthor>) => {
    const updatedAuthor = await db('authors').where({ id }).update(data).returning('*');

    if (updatedAuthor.length === 0) {
        throw new AppError(status.NOT_FOUND, `Author with ID ${id} not found`);
    }

    return updatedAuthor[0];
};

const deleteAuthorFromDB = async (id: string) => {
    const result = await db('authors').where({ id }).del();

    if (result === 0) {
        throw new AppError(status.NOT_FOUND, `Author with ID ${id} not found`);
    }

    return result;
};

export const AuthorService = {
    createAuthorIntoDB,
    getAuthorsFromDB,
    getAuthorFromDB,
    updateAuthorIntoDB,
    deleteAuthorFromDB,
};
