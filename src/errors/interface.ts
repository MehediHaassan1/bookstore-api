export type TErrorSourceList = {
    path: string | number;
    message: string;
}[];

export type TErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSourceList;
};