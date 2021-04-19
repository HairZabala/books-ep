import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { getBookById } from '../../selectors/getBookById';
import { booksStartUpdating, booksStartCreating } from '../../actions/books';
import Swal from 'sweetalert2';

export const AddBookScreen = ({ history }) => {

    const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

    const dispatch = useDispatch();
    const { book: bookID = ''} = useParams();

    const { books = [] } = useSelector(state => state.book)

    const bookSelected = useMemo(() => getBookById(bookID, books), [bookID, books]) 

    const [ formBookValues, handleBookInputChange, reset ] = useForm({
        title: bookSelected?.title || '',
        author: bookSelected?.author || '',
        year: bookSelected?.year || 0 
    });

    const { title, author, year } = formBookValues; 

    const handleBack = () => {
        history.replace('/');
    }

    const handleSaveBook = (e) => {
        e.preventDefault();

        if ( bookID === '') {
            handleCreateBook();
        }else {
            handleUpdateBook();
        }
    }

    const handleCreateBook = () => {

        const { title, author, year } = formBookValues;

        if(!title || !author || !year){
            return Toast.fire({
                icon: 'error',
                text: 'You must fill up the form before saving it.'
            });
        }

        dispatch( booksStartCreating(formBookValues, reset));
    }

    const handleUpdateBook = () => {

        const { title, author, year } = formBookValues;

        if(!title || !author || !year){
            return Toast.fire({
                icon: 'error',
                text: 'You must fill up the form before saving it.'
            });
        }

        dispatch( booksStartUpdating(bookID, formBookValues) );
    }

    return (

        <div className="container">

            <div className="row justify-content-center">
                <div className="col">

                <h2>Book details</h2>
                <hr />

                <form onSubmit={ handleSaveBook }>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="title" 
                            aria-describedby="title" 
                            value={ title }
                            onChange={ handleBookInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="author" 
                            value={ author }
                            onChange={ handleBookInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            name="year" 
                            value={ year }
                            onChange={ handleBookInputChange }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">
                        <i className="fas fa-save"></i> 
                        <span> Save</span>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={ handleBack }>
                        <i className="fas fa-undo-alt"></i> 
                        <span> Back</span>
                    </button>
                </form>

                </div>
            </div>
        </div>

            

    )
}
