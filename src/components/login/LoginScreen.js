import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = ({history}) => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        email: "hair.zabala@gmail.com",
        password: "123456"
    });

    const { email, password } = formLoginValues; 

    const handleLogin = (e) => {
        e.preventDefault();

        // const lastPath = localStorage.getItem('lastPath') || '/';
        
        dispatch( startLogin(email, password) );
        
        // history.replace(lastPath);
        
    }

    return (
        <>
            <div className="container">
                <h3 className="mt-5">Welcome to BooksEP - Please log-in.</h3>
                <hr />
                <div className="row login-container justify-content-center animate__animated animate__fadeInLeft">
                    <div className="col-6 login-form-1 text-center">
                        <h3>BooksEP</h3>
                        <form onSubmit={ handleLogin }>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="email"
                                    name="email"
                                    value={ email }
                                    onChange={ handleLoginInputChange }
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    name="password"
                                    value={ password }
                                    onChange={ handleLoginInputChange }
                                />
                            </div>
                            <div className="form-group">
                                <button 
                                    type="submit"
                                    className="btn btn-primary btn-block">
                                        Login
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}