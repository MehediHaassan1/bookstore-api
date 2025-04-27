import db from '../../../config/db';
import { IAuthor } from './author.interface';
import { AuthorModel } from './author.model';

const createAuthorIntoDB = async (data: IAuthor) => {
    const [newAuthor] = await db('authors').insert(data).returning('*');
    return newAuthor;
};

const getAuthorsFromDB = async () => {
    const authors = await db('authors').select('*'); // Select all authors
    return authors;
};

const getAuthorFromDB = async (id: string) => {
    const author = await db('authors').where({ id }).first();
    return author;
};

const updateAuthorIntoDB = async (id: string, data: Partial<IAuthor>) => {
    const updatedAuthor = await db('authors').where({ id }).update(data).returning('*');

    if (updatedAuthor.length === 0) {
        throw new Error(`Author with ID ${id} not found`);
    }

    return updatedAuthor[0];
};

const deleteAuthorFromDB = async (id: string) => {
    const result = await db('authors').where({ id }).del();

    if (result === 0) {
        throw new Error('Author not found');
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
