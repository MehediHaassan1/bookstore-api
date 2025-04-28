import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { bookAllowedFilters } from "../constant/book.constant";
import { BookService } from "../services/book.service";

const createBook = catchAsync(async(req, res) => {
    const data = req.body;
    const result = await BookService.createBookIntDB(data);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book created successfully',
        data: result,
    })
})

const getAllBooks = catchAsync(async(req, res) => {
    const filters = pick(req.query, bookAllowedFilters);
    const options = pick(req.query, ['limit', 'page']);
    const result = await BookService.getAllBooksIntDB(filters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Books retrieved successfully',
        data: result.books,
        meta: { ...result.meta, total: Number(result.meta.total) },
    })
})

const getBookById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await BookService.getBookByIdFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book retrieved successfully',
        data: result,
    })
})

const updateBook = catchAsync(async(req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await BookService.updateBookByIdIntoDB(id, data);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book updated successfully',
        data: result,
    })
})

const deleteBookById = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await BookService.deleteBookByIdFromDB(id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Book deleted successfully',
        data: result,
    })
})


export const BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBookById,
}