import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm';
import { AlertBookScreen } from './AlertBookScreen';
import { TableBookScreen } from './TableBookScreen';
import { booksStarLoading, booksStartDeleting } from '../../actions/books';
import './book.css';
import { useLocation } from 'react-router';
import queryString from 'query-string'

export const BooksScreen = ({ history }) => {

    const location = useLocation();
    const { year = '' } = queryString.parse(location.search);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( booksStarLoading(year) );
    }, [dispatch, year])

    const { books = [] } = useSelector(state => state.book);

    const [ formFilterValues, handleFilterInputChange ] = useForm({
        yearFiltered: year || ''
    });

    const { yearFiltered } = formFilterValues; 

    const handleNewBook = () => {
        history.replace('/create');
    }

    const handleUpdateBook = (book) => {
        history.replace(`/update/${book}`);
    }
    
    const handleDeleteBook = (book) => {
        dispatch( booksStartDeleting(book) );
    }

    const handleFilterByYear = (e) => {
        e.preventDefault();
        history.push(`?year=${ yearFiltered }`);
    }

    return (
        <div className="container">

            <div className="row">
                <div className="col">
                    <h2>Books Screen</h2>
                    <hr />

                    <div className="row animate__animated animate__fadeInLeft">

                        <div className="col-8">
                            <form className="form-inline" onSubmit={ handleFilterByYear }>
                                <input 
                                    type="number" 
                                    className="form-control mb-2 mr-2" 
                                    name="yearFiltered" 
                                    placeholder="Filter by year" 
                                    value={ yearFiltered }
                                    onChange={ handleFilterInputChange }
                                />
                                <button type="submit" className="btn btn-primary mb-2">Filter</button>
                            </form>
                        </div>

                        <div className="col-4">
                            <div className="text-right">
                                <button className="btn btn-info btn-sm mb-2"
                                    onClick={ handleNewBook }>
                                    <i className="fa fa-plus" aria-hidden="true"></i> New book   
                                </button>
                            </div>
                        </div>

                        
                    </div>
                    
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
