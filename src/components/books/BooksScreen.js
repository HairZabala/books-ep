import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksStarLoading, booksStartDeleting } from '../../actions/books';
import { AlertBookScreen } from './AlertBookScreen';
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

                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Year</th>
                                    <th className="text-nowrap" scope="col">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    books.map( (book, i) => (
                                        <tr key={book._id}>
                                            <th scope="row">{(i+1)}</th>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.year}</td>
                                            <td className="text-nowrap text-center">
                                                <span 
                                                    className="cursor mr-2" 
                                                    data-toggle="tooltip" 
                                                    data-original-title="Actualizar" 
                                                    onClick={ () => handleUpdateBook(book._id) }> 
                                                    <i className="fas fa-pencil-alt"></i> 
                                                </span>
                                                <span 
                                                    className="cursor" 
                                                    data-toggle="tooltip" 
                                                    data-original-title="Eliminar" 
                                                    onClick={ () => handleDeleteBook(book._id) }> 
                                                    <i className="fas fa-trash-alt text-danger"></i> 
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                    
                </div>
            </div>
        </div>

    )
}
