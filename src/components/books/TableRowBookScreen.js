import React from 'react'

export const TableRowBookScreen = ({ book, index,  handleUpdateBook, handleDeleteBook }) => {
    return (
        <tr key={book._id}>
            <th scope="row">{(index+1)}</th>
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
    )
}
