import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { starChecking } from '../actions/auth';
import { BooksScreen } from '../components/books/BooksScreen';
import { LoginScreen } from '../components/login/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch( starChecking() )
    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={ !!uid }
                    />
                    <PrivateRoute 
                        path="/" 
                        component={ BooksScreen } 
                        isAuthenticated={ !!uid }/>
                    {/* <Route exact path="/login" component={ LoginScreen } isAuthenticated={logged}/>
                    <Route path="/" component={ BooksScreen } isAuthenticated={logged}/> */}
                </Switch>
            </div>
        </Router>
    )
}
