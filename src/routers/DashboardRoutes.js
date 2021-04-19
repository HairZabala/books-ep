import React from 'react'
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { AddBookScreen } from '../components/books/AddBookScreen';
import { BooksScreen } from '../components/books/BooksScreen';
import { Navbar } from '../components/ui/Navbar';

export const DashboardRoutes = () => {
    return (
        <>
            
            <Navbar />
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <div className="container mt-4">
                <Switch>
                    <Route exact path="/" component={ BooksScreen }/>
                    <Route exact path="/create" component={ AddBookScreen }/>
                    <Route exact path="/update/:book" component={ AddBookScreen }/>
                    <Redirect to="/" />
                </Switch>
            </div>
        </>
    )
}
