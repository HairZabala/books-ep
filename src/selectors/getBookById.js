export const getBookById = ( id, books ) => {
    return books.find( book => book._id === id )
} 