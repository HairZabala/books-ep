import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksStarLoading, booksStartDeleting } from '../../actions/books';
import { AlertBookScreen } from './AlertBookScreen';
import { TableBookScreen } from './TableBookScreen';
import './book.css';

export const BooksScreen = ({ history }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( booksStarLoading() );
    }, [dispatch])

    const { books = [] } = useSelector(state => state.book);

    const handleNewBook = () => {
        history.replace('/create');
    }

    const handleUpdateBook = (book) => {
        history.replace(`/update/${book}`);
    }
    
    const handleDeleteBook = (book) => {
        dispatch( booksStartDeleting(book) );
    }



    return (
        <div className="container">

            <div className="row">
                <div className="col">
                    <h2>Books Screen</h2>
                    <hr />

                    <button className="btn btn-info btn-sm mb-2"
                        onClick={ handleNewBook }>
                        <i className="fa fa-plus" aria-hidden="true"></i> New book   
                    </button>

                    { 
                        (books.length === 0) ?
                        (
                            <AlertBookScreen />
                        ) :

                        <TableBookScreen 
                            books={books}
                            handleUpdateBook={ handleUpdateBook } 
                            handleDeleteBook={ handleDeleteBook } 
                        />
                    }
                    
                </div>
            </div>
        </div>

    )
}
