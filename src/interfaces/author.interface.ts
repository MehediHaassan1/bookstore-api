export interface IAuthor {
    id?: number;
    name: string;
    bio?: string;
    birthdate: Date;
}

export type IAuthorFilterRequest = {
    name?: string | undefined;
    bio?: string | undefined;
    searchTerm?: string | undefined;
};
