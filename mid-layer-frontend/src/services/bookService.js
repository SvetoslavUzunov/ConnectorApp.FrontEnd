import * as request from '../utility/requester';
import * as bookConstants from '../constants/bookConstants';

const booksUrl = bookConstants.BooksUrl;

export const getByIdAsync = async (bookId) => {
    return await fetch(`${booksUrl}/GetById/${bookId}`)
        .then(res => res.json());
};

export const getAllAsync = () => request.get(`${booksUrl}/GetAll`);

export const createAsync = async (bookData, token) => {
    let response = await fetch(`${booksUrl}/Create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify({ ...bookData })
    });
    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
};

export const editAsync = (bookData) => request.put(`${booksUrl}/Edit`, bookData);

export const removeAsync = async (bookId, token) => {
    return await fetch(`${booksUrl}/DeleteById/${bookId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
};