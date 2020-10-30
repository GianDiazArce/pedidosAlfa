import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByFamilys } from '../../actions/pedidos'
import AddIcon from '@material-ui/icons/Add';
// import { useForm } from '../../hooks/useForm'
// import { dbpedidos } from '../../db/dbpedidos'

/*
    Observaciones:
        - El boton debe estar desactivado si no se ingresan fardos o millares
        - Si se usa fardo desactivar el millar y viceversa o crear una manera optima de solo ingresar uno
        - Al agregar a la tabla se deben limpiar los datos ( aplica para el otro prototipo )
*/ 
import './pedidosStyles.css';

const familias = [
    'ASAS',
    'ASAS IIMPRESAS POLLO',
    'ASAS IIMPRESAS',
    'ASAS NAVIDEÑAS',
    'ASAS IIMPRESAS PERU',
    'BANDEJA',
    'BRILLO LUCC',
    'BRILLO',
    'COMPOSTABLE',
    'CHEQUERA',
    'CRISTALES',
    'ENVASES PP',
    'ENVASES PS',
    'NORMAL',
    'LAMIGRASA',
    'RECUPERADO',
    'OXO BIODEGRADABLE',
    'ROLLOSITO',
    'ROLLOS',
    'SORBETE COMPOSTABLE',
    'TAPAS PP',
    'TAPAS PS',
    'VASOS PP',
    'PLATOS',
    'VASO TERMICO',
    'TROQUELADAS',
]
const productInit = {
    codeProduct: '',
    productName: '',
    productUM: '',
    productFamily: '',
}

export const PedidoScreen2 = () => {

    // let productFamilys = {}
    // const [searchFamily, ] = useState();
    const { products } = useSelector(state => state.pedido)
    const dispatch = useDispatch();
    const [cboProductName, setCboProductName] = useState(productInit);
    // useForm()

    const defaultProps = {
        options: familias,
        getOptionLabel: (option) => option,
    };
    
    const handleFamilyChange = (o, value) => {
        dispatch(getProductsByFamilys(value));
        setCboProductName(productInit);
    }

    const handleCboProductNameChange = (o, value) => {
        value ? 
            setCboProductName({
                ...value,
            })
        : setCboProductName(productInit)
        setCboProductName(value)
    }


    return (
        <div>
            <Grid container>
                <Grid item sm={ 12 }>
                    <div className="card mt-5">
                        <h5 className="card-header">Información del cliente</h5>
                        <div className="card-body row">
                            <div className="form-group col-md-6">
                                <label htmlFor="clientName">Nombre:</label>
                                <input type="text" className="form-control" id="clientName" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="clientCondPago">Condición de pago:</label>
                                <input type="text" className="form-control" id="clientCondPago" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="clientRazonSocial">Razón Social:</label>
                                <input type="text" className="form-control" id="clientRazonSocial" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="clientDestino">Destino:</label>
                                <input type="text" className="form-control" id="clientDestino" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="clientTransporte">Transporte:</label>
                                <input type="text" className="form-control" id="clientTransporte" />
                            </div>
                        </div>
                    </div> {/* Fin de la card info de cliente */}
                </Grid>

                <Grid item sm={12} className="mt-5" >
                    <div className="card">
                        <h5 className="card-header">Pedido</h5>
                        <Grid container className="card-body">
                            <Grid item sm={6}>
                                <Autocomplete
                                    {...defaultProps}
                                    id="cboProductFamily"
                                    debug
                                    style={{ width: 300 }}
                                    onChange={ handleFamilyChange }
                                    renderInput={(params) => <TextField {...params} label="Familia" margin="normal" />}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <Autocomplete
                                    id="cboProductsName"
                                    options={ products }
                                    // getOptionLabel={(option) => option.productName}
                                    getOptionLabel={(option) => option.productName}
                                    style={{ width: 450 }}
                                    onChange={ handleCboProductNameChange }
                                    getOptionSelected={(opt) => true}
                                    value={cboProductName}
                                    // disabled={ !products }
                                    
                                    renderInput={(params) => <TextField {...params} label="Nombre de producto" margin="normal" />}
                                />
                            </Grid>
                            <Grid item sm={6}></Grid>
                            <Grid item sm={6}>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                      <label htmlFor="fardos">Fardos:</label>
                                      <input type="number" name="fardos" className="form-control w-50 sinSpin" />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label htmlFor="millares">Millares:</label>
                                      <input type="number" name="millares" className="form-control w-50 sinSpin" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <br/>
                                        <button className="btn btn-outline-success mt-1"><AddIcon /> Agregar</button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}
