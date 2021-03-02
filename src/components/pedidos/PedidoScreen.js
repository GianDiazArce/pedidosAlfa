import { Grid, Paper, TextField} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { dbpedidos } from '../../db/dbpedidos';
import {
    Grid as GridDx,
    Table,
    TableEditColumn,
    TableEditRow,
    TableHeaderRow,
    TableInlineCellEditing,
    Toolbar,
    ExportPanel,
  } from '@devexpress/dx-react-grid-material-ui';
import { EditingState } from '@devexpress/dx-react-grid';

import saveAs from 'file-saver';

import { useDispatch, useSelector } from 'react-redux';
import { startAddProduct } from '../../actions/pedidos';
import { useForm } from '../../hooks/useForm';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import moment from 'moment';

const initProduct = {
    id: '',
    productName: '',
    productUM: '',
    productFamily: '',
    fardos: 0,
    millares: 0
}
const getRowId = row => row.id;
const initClient = {
    clientName: '',
    clientCondPago: '',
    clientRazonSocial: '',
    clientDestino: '',
    clientTransporte: '',
}


const customizeCell = (cell, row, column) => {
    if (row.fardos > 0) {
      if (column.name === 'fardos') {
        cell.font = { color: { argb: '000000' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
      }
      
    }
    if (row.millares > 0){
        if (column.name === 'millares') {
            cell.font = { color: { argb: '000000' } };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFBB00' } };
        }
    }
    if (row.fardos === 0){
        if(column.name === 'fardos'){
            cell.value = '-'
        }
    }

    if (row.millares === 0){
        if(column.name === 'millares'){
            cell.value = '-'
        }
        
    }
};

const totalSummaryItems = [
    { colunmName: 'fardos', type: 'sum' },
    { colunmName: 'millares', type: 'sum' },
];



/*
    Observacion:
        - Agregar la tabla al otro prototipos
        - quitar comentarios
        - acomodar el login
        - pasar a prod
*/

export const PedidoScreen = () => {
    

    const [startEditAction, ] = useState('click');
    const [selectTextOnEditStart, ] = useState(true);
    // const [cantFard, setcantFard] = useState(0)
    const [productState, setProductState] = useState(initProduct);
    const { productsTable } = useSelector(state => state.pedido)
    const [ formValues, handleInputChange, reset ] = useForm(initClient)

    const { clientName, clientCondPago, clientRazonSocial, clientDestino, clientTransporte } = formValues;
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const [ columns ] = useState([
        { name: 'id', title:'ID'},
        { name: 'fardos', title:'Fardos'},
        { name: 'millares', title:'Millares'},
        { name: 'productName', title:'Nombre Del Producto'},
        { name: 'productFamily', title:'Familia'},
    ]);
    const [tableColumnExtensions] = useState([
        { columnName: 'id', width: '13%' },
        { columnName: 'fardos', width: '8%'},
        { columnName: 'millares', width: '8%' },
        { columnName: 'productName', width: 'auto' },
        { columnName: 'productFamily', width: '10%' },
    ]);
    const [editingStateColumnExtensions] = useState([
        { columnName: 'id', editingEnabled: false },
        { columnName: 'productFamily', editingEnabled: false }
    ]);

    useEffect(() => {
        
        if(productState.id === ''){
            return;
        } else {
            dispatch( startAddProduct( productState ) )
            setRows(oldArray => [...oldArray, productState])
        }
        
    }, [productState, dispatch])
    
    
    const handleCboProductsNameChange = (e,v) => {
        
        if(v){
            const search = rows.find( product => product.id === v.id )
            if( !search ){
                setProductState( {
                    id: v.id,
                    productName: v.productName,
                    productUM: v.productUM,
                    productFamily: v.productFamily,
                    fardos: 0,
                    millares: 0
                })
            }
        }
    }
    
    const [rows, setRows] = useState(productsTable);

    
    const commitChanges = ({ added, changed, deleted }) => {
        let changedRows;
        if (added) {
        //   const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
          changedRows = [
            ...rows,
            ...added.map((row, index) => ({
              id: row.id,
              ...row,
            })),
          ];
        }
        if (changed) {
          changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        if (deleted) {
          const deletedSet = new Set(deleted);
          changedRows = rows.filter(row => !deletedSet.has(row.id));
        }
        setRows(changedRows);
    };
    const FocusableCell = ({ onClick, ...restProps }) => (
        <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
    );



     // Exportacion
    

    const exporterRef = useRef(null);

     const startExport = useCallback((options) => {
         exporterRef.current.exportGrid(options);
     }, [exporterRef]);

    const onSave = (workbook) => {
        workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${clientName}.xlsx`);
        });
    };


    const customizeHeader = (worksheet) => {
        const generalStyles = {
            font: { bold: true },
            fill: {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
            },
            alignment: { horizontal: 'left' },
        };
        for (let rowIndex = 2; rowIndex < 7; rowIndex += 1) {
            worksheet.mergeCells(rowIndex, 1, rowIndex, 3);
            worksheet.mergeCells(rowIndex, 4, rowIndex, 6);
            Object.assign(worksheet.getRow(rowIndex).getCell(1), generalStyles);
            Object.assign(worksheet.getRow(rowIndex).getCell(3), generalStyles);
        }
        worksheet.getRow(2).height = 20;
        worksheet.getRow(2).getCell(1).font = { bold: true, size: 16 };
        worksheet.getRow(2).getCell(4).font = { bold: true, size: 16 };
        worksheet.getColumn(1).values = ['Fecha de Pedido:', 'Nombre del cliente:', 'Condición de pago:', 'Razon Social:', 'Destino:', 'Transporte:'];
        worksheet.getColumn(4).values = [moment().format('DD/MM/YYYY'), clientName.toUpperCase(), clientCondPago.toUpperCase(), clientRazonSocial.toUpperCase(), clientDestino.toUpperCase(), clientTransporte.toUpperCase()];
        worksheet.addRow({});
        
    };

    const customizeFooter = (worksheet) => {
        const { lastRow } = worksheet;
        let currentRowIndex = lastRow.number + 2;
        for (let rowIndex = 0; rowIndex < 3; rowIndex += 1) {
            worksheet.mergeCells(currentRowIndex + rowIndex, 1, currentRowIndex + rowIndex, 6);
            Object.assign(worksheet.getRow(currentRowIndex + rowIndex).getCell(1), { font: { bold: true }, alignment: { horizontal: 'right' } });
        }
        let totalFardos = 0;
        let totalMillares = 0;
        
        rows.map( row => {
            totalFardos += parseInt(row.fardos)
            return totalFardos;
        });
        rows.map( row => {
            totalMillares += parseInt( row.millares );
            return totalMillares
        } )
        worksheet.getRow(currentRowIndex).getCell(1).value = `Total de fardos: ${totalFardos}`;
        worksheet.getRow(currentRowIndex).getCell(1).font = { size: 13.5, bold: true };
        currentRowIndex += 1;
        worksheet.getRow(currentRowIndex).getCell(1).value = `Total de millares: ${totalMillares}`;
        worksheet.getRow(currentRowIndex).getCell(1).font = { size: 13.5, bold: true };
        currentRowIndex += 1;
    }

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
                                    <input type="text" className="form-control" id="clientName" name="clientName" value={ clientName } onChange={ handleInputChange } />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="clientCondPago">Condición de pago:</label>
                                    <input type="text" className="form-control" id="clientCondPago" name="clientCondPago" value={ clientCondPago } onChange={ handleInputChange } />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="clientRazonSocial">Razón Social:</label>
                                    <input type="text" className="form-control" id="clientRazonSocial" name="clientRazonSocial" value={ clientRazonSocial } onChange={ handleInputChange } />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="clientDestino">Destino:</label>
                                    <input type="text" className="form-control" id="clientDestino" name="clientDestino" value={ clientDestino } onChange={ handleInputChange } />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="clientTransporte">Transporte:</label>
                                    <input type="text" className="form-control" id="clientTransporte" name="clientTransporte" value={ clientTransporte } onChange={ handleInputChange } />
                                </div>
                                <div className="col-md-6 pt-4">
                                    <button className="btn btn-info mt-1" type="reset" onClick={ reset }>Reset</button>
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
                        <div className="card-body row">
                            <div className=" col-md-8">
                                <Autocomplete
                                    id="grouped-demo"
                                    // multiple
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
                        </div>
                    </div>
                </Grid>
                <Grid item sm={ 12 } className="mt-5">
                    <Paper>
                        <GridDx
                            rows={rows}
                            columns={columns}
                            getRowId={getRowId}
                        >
                            <EditingState onCommitChanges={commitChanges} columnExtensions={editingStateColumnExtensions} />
                            <Table columnExtensions={tableColumnExtensions} cellComponent={FocusableCell} />
                            <TableHeaderRow />
                            <Toolbar />
                            {/* <EditPropsPanel
                                // defaultAction={startEditAction}
                                // changeAction={setStartEditAction}
                                isSelectText={selectTextOnEditStart}
                                changeSelectText={setSelectTextOnEditStart}
                            /> */}
                            <TableInlineCellEditing
                                startEditAction={startEditAction}
                                selectTextOnEditStart={selectTextOnEditStart}
                            />
                            <TableEditRow />
                            <TableEditColumn
                                width='100px'
                                messages={ {deleteCommand:'borrar'} }
                                showDeleteCommand
                            />
                            <ExportPanel  startExport={startExport} />   
                        </GridDx>
                        <GridExporter
                            ref={exporterRef}
                            rows={rows}
                            columns={columns}
                            totalSummaryItems={totalSummaryItems}
                            // columnExtensions={columnExtensions}
                            onSave={onSave}
                            customizeCell={customizeCell}
                            hiddenColumnNames={ ['id', 'productFamily'] }
                            // customizeSummaryCell={customizeSummaryCell}
                            customizeHeader={customizeHeader}
                            customizeFooter={customizeFooter}
                        />
                    </Paper>
                    
                </Grid>

                <Grid item sm={12} className="my-5"></Grid>
            </Grid>
        </div>
    )
}
