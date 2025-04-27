import status from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthorService } from "./author.service";

const createAuthor = catchAsync(async(req, res) => {
  const data = req.body;
 
  const result = await AuthorService.createAuthorIntoDB(data);

  sendResponse(res, {
    success: true,
    statusCode: status.CREATED,
    message: "Author created successfully.",
    data: result,
  })
})

const getAuthors = catchAsync(async(req, res) => {
  const result = await AuthorService.getAuthorsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Authors retrieved successfully.",
    data: result,
  })
})

const getAuthor = catchAsync(async(req, res) => {
  const {id} = req.params;
  const result = await AuthorService.getAuthorFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Author retrieved successfully.",
    data: result,
  })
})

const updateAuthor = catchAsync(async(req, res) => {
  const data = req.body;
  const {id} = req.params;
  const result = await AuthorService.updateAuthorIntoDB(id, data);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Author updated successfully",
    data: result,
  })
})

const deleteAuthor = catchAsync(async(req, res) => {
  const {id} = req.params;
  const result = await AuthorService.deleteAuthorFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Author deleted successfully",
    data: result,
  })
})

export const AuthorController = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
}