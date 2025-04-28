import { IOptions, IOptionsResult } from "../interfaces/pagination.interface";

const pagination = (options: IOptions): IOptionsResult => {
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * limit;

    return {
        page,
        limit,
        skip,
    };
};

export default pagination;