import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const booksStarLoading = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken('books');
            const body = await resp.json();
            
            const books = body.books;
            dispatch(booksLoaded(books));

        } catch (error) {
            console.log(error);
        }

    }
}

const booksLoaded = ( books ) => ({
    type: types.booksLoaded,
    payload: books
})

export const booksStartDeleting = (book) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`books/${book}`, {}, 'DELETE');
            const body = await resp.json();

            console.log(body);
            dispatch(bookDeleted(body.book));

        } catch (error) {
            console.log(error);
        }
    }
}

const bookDeleted = ( book ) => ({
    type: types.bookDeleted,
    payload: book
})