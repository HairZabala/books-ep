import React from 'react'
import { TableHeadBookScreen } from './TableHeadBookScreen'
import { TableRowBookScreen } from './TableRowBookScreen'

export const TableBookScreen = ({ books, handleUpdateBook, handleDeleteBook }) => {
    return (
        <table className="table">
            <TableHeadBookScreen />
            <tbody>

                {
                    books.map( (book, i) => (
                        <TableRowBookScreen key={book._id}
                            book={book}
                            index={i}
                            handleUpdateBook={ handleUpdateBook } 
                            handleDeleteBook={ handleDeleteBook } 
                        />
                    ))
                }
            </tbody>
        </table>
    )
}
