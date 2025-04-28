import { IOptions, IOptionsResult } from "../interfaces/pagination.interface";

const pagination = (options: IOptions): IOptionsResult => {
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const offset = (page - 1) * limit;

    return {
        page,
        limit,
        offset,
    };
};

export default pagination;