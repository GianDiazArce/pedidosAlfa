import { dbpedidos } from "../db/dbpedidos"
import { types } from "../types/types";


export const getProductsByFamilys = (familyName) => {
    return async(dispatch) => {
        const products = await dbpedidos.filter( (pedido) => pedido.productFamily === familyName );

        dispatch(fillProductsByFamilys(products));
    }
    
}

export const startAddProduct = ( product ) => {
    return (dispatch) => {
        dispatch( addProduct( product ) );
    }
}
export const startAddProduct2 = ( product ) => {
    return (dispatch) => {
        dispatch( addProduct2( product ) );
    }
}

const addProduct = ( product ) => ({
    type: types.pedidoProductAdd,
    payload: product
})
const addProduct2 = ( product ) => ({
    type: types.pedidoProductAdd2,
    payload: product
})

const fillProductsByFamilys  = (products) => ({
    type: types.pedidoProductsByFamily,
    payload: products
})
