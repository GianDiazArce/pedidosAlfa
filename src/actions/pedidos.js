import { dbpedidos } from "../db/dbpedidos"
import { types } from "../types/types";


export const getProductsByFamilys = (familyName) => {
    return async(dispatch) => {
        const products = await dbpedidos.filter( (pedido) => pedido.productFamily === familyName );

        dispatch(fillProductsByFamilys(products));
    }
    
}

const fillProductsByFamilys  = (products) => ({
    type: types.pedidoProductsByFamily,
    payload: products
})