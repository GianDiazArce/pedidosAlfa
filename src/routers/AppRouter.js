import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { PedidosRouter } from './PedidosRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { firebase } from '../firebase/firebase-config';

export const AppRouter = () => {

    const [isLoggedIn, setIsLoggedIn ] = useState(false);
    const [checking, setChecking] = useState( true );
    const dispatch = useDispatch();


    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => {
            if( user?.uid ){
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);
                /*
                    Cargar las cosas al loguearse
                */
            } else {
                setIsLoggedIn( false );
            }
            setChecking(false);
        })

    }, [ dispatch ]);

    if( checking ) {
        return <h1>Espere...</h1>;
    }

    // setIsLoggedIn
    return (
        <Router>
            <div>
                
                <Switch>
                <PublicRoute
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={isLoggedIn}
                />
                <PrivateRoute
                    path="/"
                    component={ PedidosRouter }
                    isAuthenticated={isLoggedIn}
                />
                </Switch>
            </div>
        </Router>
    )
}
