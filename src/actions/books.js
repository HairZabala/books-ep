import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const booksStarLoading = (year = '') => {
    return async(dispatch) => {

        // console.log(year);
        if( year === '' ) {
            dispatch(allBooksStartLoading());
        }else {
            dispatch(BooksFilterByYearLoading(year));
        }
    }
}

export const allBooksStartLoading = () => {
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

export const BooksFilterByYearLoading = (year) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`books/getbyyear/${year}`);
            const body = await resp.json();
            console.log(body);
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

            // console.log(body);
            dispatch(bookDeleted(body.book));
            Swal.fire('Book deleted', 'The book has been deleted', 'success')

        } catch (error) {
            console.log(error);
        }
    }
}

const bookDeleted = ( book ) => ({
    type: types.bookDeleted,
    payload: book
})

export const booksStartUpdating = (bookId, book) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`books/${bookId}`, book, 'PUT');
            await resp.json();

            // console.log(body);
            booksStarLoading();
            
            Swal.fire({
                icon: 'success',
                title: 'Book updated!',
                text: `The book has been updated.`,
                confirmButtonText: 'Got it.',
                allowOutsideClick: false,
                allowEscapeKey: false
            });


        } catch (error) {
            console.log(error);
        }
    }
}

export const booksStartCreating = (book, reset) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`books`, book, 'POST');
            await resp.json();

            reset();
            booksStarLoading();
            
            Swal.fire({
                icon: 'success',
                title: 'Book created!',
                text: `The book has been created.`,
                confirmButtonText: 'Got it.',
                allowOutsideClick: false,
                allowEscapeKey: false
            });


        } catch (error) {
            console.log(error);
        }
    }
}

// const bookUpdated = ( book ) => ({
//     type: types.bookUpdated,
//     payload: book
// })