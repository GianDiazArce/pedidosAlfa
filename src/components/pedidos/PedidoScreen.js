import { Grid, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react'
import { dbpedidos } from '../../db/dbpedidos';
import AddIcon from "@material-ui/icons/Add";

export const PedidoScreen = () => {

    // const options = dbpedidos.map((option) => {
    //     const firstLetter = option.productName[0].toUpperCase();
    //     return {
    //       firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //       ...option,
    //     };
    // });
    const [cboProductName, setCboProductName] = useState('');

    const handleCboProductsNameChange = (e,v) => {
        setCboProductName(v.productName);
        console.log(cboProductName)
    }

    // const defaultProps = {
    //     options: top100Films,
    //     getOptionLabel: (option) => option.title,
    // };

    return (
        <div>
            <Grid container className="mt-5">
                <Grid item sm={ 12 }>
                    <div className="card">
                        <h5 className="card-header">Información del cliente</h5>
                        <div className="card-body">

                            <form className="row">
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
                            </form>
                            {/* <button className="btn btn-primary">Agregar</button> */}
                        </div>
                    </div> {/* Fin de la card info de cliente */}
                </Grid>

                <Grid item sm={12} className="mt-5">
                    <div className="card">
                        <h5 className="card-header">
                            Productos
                        </h5>
                        <div className="card-body">
                            <div className="form-group col-md-6 pl-0">
                                <Autocomplete
                                    id="grouped-demo"
                                    // options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                                    options={dbpedidos}
                                    groupBy={(option) => option.productFamily}
                                    getOptionLabel={(option) => option.productName}
                                    style={{ width: 600 }}
                                    getOptionSelected={ opt => true }
                                    onChange={ handleCboProductsNameChange }
                                    renderInput={(params) => <TextField {...params} label="Productos" variant="outlined" />}
                                />
                            </div>
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
                        </div>
                    </div>
                </Grid>
                <Grid item sm={ 12 }>
                    
                </Grid>
            </Grid>
        </div>
    )
}
