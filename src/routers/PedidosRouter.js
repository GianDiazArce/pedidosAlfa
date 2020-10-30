import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { ErrorScreen } from '../components/error/ErrorScreen'
import { PedidoScreen } from '../components/pedidos/PedidoScreen'
import { PedidoScreen2 } from '../components/pedidos/PedidoScreen2'
import { ProductosScreen } from '../components/productos/ProductosScreen'
import { NavBar } from '../components/ui/NavBar'

export const PedidosRouter = () => {
    return (
        <>
            <div>
                <NavBar />
                <div className="container">
                    <Switch>
                        <Route  
                            exact path="/"
                            component={ PedidoScreen }
                        />
                        <Route  
                            exact path="/pedidos2"
                            component={ PedidoScreen2 }
                        />
                        <Route  
                            exact path="/registrar-usuario"
                            component={ RegisterScreen }
                        />
                        <Route  
                            exact path="/productos"
                            component={ ProductosScreen }
                        />
                        <Route  
                            exact path="/error"
                            component={ ErrorScreen }
                        />
                        <Redirect to="/error" />
                    </Switch>
                </div>
            </div>
        </>
    )
}
