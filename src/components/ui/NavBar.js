import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { startLogout } from '../../actions/auth';

import './navbarStyles.css';

export const NavBar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">PedidosApp</Link>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink activeClassName="active" className="nav-link nav-item" exact to="/">Pedidos1</NavLink>
                        <NavLink activeClassName="active" className="nav-link nav-item" exact to="/pedidos2">Pedidos2</NavLink>
                        {
                            (name === 'gian') &&
                            <NavLink activeClassName="active" className="nav-link nav-item" exact to="/productos">Productos</NavLink>
                            
                        }
                        {
                            (name === 'gian') &&
                            <NavLink activeClassName="active" className="nav-link nav-item" exact to="/registrar-usuario">Registrar</NavLink>
                            
                        }
                        
                    </div>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">
                    <div className="nav-link nav-item box-name">
                        <span
                            className="text-info mr-1 user-name"
                        >
                            { name }
                        </span>
                    </div>
                    <button
                        className="nav-item nav-link btn"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
            </div>
        </nav>
    )
}
