export interface IBook {
    title: string;
    description: string;
    published_date: Date;
    author_id: number;
}

export type IBookFilterRequest = {
    title?: string | undefined;
    description?: string | undefined;
    author?: number | undefined;
    searchTerm?: string | undefined;
};