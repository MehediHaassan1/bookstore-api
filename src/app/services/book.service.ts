import status from 'http-status';
import { IBook, IBookFilterRequest } from '../../interfaces/book.interface';
import AppError from '../../errors/AppError';
import db from '../../config/db';
import moment from 'moment';
import { IOptions } from '../../interfaces/pagination.interface';
import pagination from '../../utils/pagination';
import { bookSearchFields } from '../constant/book.constant';

const createBookIntDB = async (data: IBook) => {
    const { published_date, ...rest } = data;
    const publishedDate = moment.utc(published_date);

    const [newBook] = await db('books')
        .insert({ ...rest, published_date: publishedDate })
        .returning('*');
    if (!newBook) {
        throw new AppError(status.BAD_REQUEST, 'Book creation failed.');
    }
    return newBook;
};

const getAllBooksIntDB = async (params: IBookFilterRequest, options: IOptions) => {
    const { page, limit, offset } = pagination(options);
    const { searchTerm, author } = params;
    const query = db('books').select('*');

    if (searchTerm) {
        query.where((builder) => {
            bookSearchFields.forEach((field) => {
                builder.orWhere(field, 'ilike', `%${searchTerm}%`);
            });
        });
    }

    if (author) {
        query.andWhere('author_id', author);
    }

    query.limit(limit as number).offset(offset);

    const books = await query;

    const totalQuery = db('books').count('* as count');

    if (searchTerm) {
        totalQuery.modify((qb) => {
            qb.where((builder) => {
                bookSearchFields.forEach((field) => {
                    builder.orWhere(field, 'ilike', `%${searchTerm}%`);
                });
            });
        });
    }

    if (author) {
        totalQuery.andWhere('author_id', author);
    }

    const total = await totalQuery.first();

    return {
        meta: {
            page,
            limit,
            total: total?.count || 0,
            totalPage: Math.ceil((Number(total?.count) || 0) / (limit as number)),
        },
        books,
    };
};

const getBookByIdFromDB = async (id: string) => {
    const book = await db('books')
        .select(
            'books.id',
            'books.title',
            'books.description',
            'books.published_date',
            'books.author_id',
            'authors.name as author_name',
            'authors.bio as author_bio',
            'authors.birthdate as author_birthdate',
        )
        .leftJoin('authors', 'books.author_id', 'authors.id')
        .where('books.id', id)
        .first();

    if (!book) {
        throw new AppError(status.NOT_FOUND, 'Book not found');
    }

    const { author_name, author_bio, author_birthdate, ...rest } = book;

    return {
        ...rest,
        author: {
            author_name,
            author_bio,
            author_birthdate,
        },
    };
};

const updateBookByIdIntoDB = async (id: string, data: Partial<IBook>) => {
    const { published_date, ...rest } = data;
    const publishedDate = moment.utc(published_date);

    const updatedBook = await db('books')
        .where({ id })
        .update({ ...rest, published_date: publishedDate })
        .returning('*');

    if (updatedBook.length === 0) {
        throw new AppError(status.NOT_FOUND, `Book with ID ${id} not found`);
    }

    return updatedBook[0];
};

const deleteBookByIdFromDB = async (id: string) => {
    const deletedBook = await db('books').where({ id }).del().returning('*');
    if (deletedBook.length === 0) {
        throw new AppError(status.NOT_FOUND, `Book with ID ${id} not found`);
    }
    return deletedBook[0];
};

export const BookService = {
    createBookIntDB,
    getAllBooksIntDB,
    getBookByIdFromDB,
    updateBookByIdIntoDB,
    deleteBookByIdFromDB,
};
