import { types } from "../types/types"

export const bookReducer = (state = {  }, action) => {

    switch (action.type) {
        case types.booksLoaded:
            return {
                ...state,
                books: [...action.payload],
            }        
        case types.bookDeleted:
            return {
                books: state.books.filter( book => book._id !== action.payload._id ),
            }        
        case types.bookUpdated:
            return {
                books: [
                    state.books.map( book => {
                        if(book._id === action.payload._id){
                            return action.payload;
                        }else {
                            return book;
                        }
                        
                    })
                ],
            }        
        default:
            return state;
    }

}