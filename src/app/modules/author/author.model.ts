import knex from "knex";

interface Author {
  id: number;
  name: string;
  bio?: string;
  birthdate: string;
}

const getAllAuthors = async (): Promise<Author[]> => {
  return knex('authors').select('*');
};

const getAuthorById = async (id: number): Promise<Author | null> => {
  const author = await knex('authors').where({ id }).first();
  return author || null;
};

const createAuthor = async (author: Author): Promise<Author> => {
  console.log({author});
  const [newAuthor] = await knex('authors').insert(author).returning('*');
  return newAuthor;
};

const updateAuthor = async (id: number, author: Author): Promise<Author | null> => {
  const [updatedAuthor] = await knex('authors').where({ id }).update(author).returning('*');
  return updatedAuthor || null;
};

const deleteAuthor = async (id: number): Promise<void> => {
  await knex('authors').where({ id }).del();
};


export const AuthorModel = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
}