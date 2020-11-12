import { types } from "../types/types";


const initialPedidoState = {
    products: [],
    productsTable: [],
    productsTable2: [],
}

export const pedidosReducers = ( state = initialPedidoState, action ) => {
    switch (action.type) {
        case types.pedidoProductsByFamily:
            return {
                ...state,
                products: [ ...action.payload ]
            }
        
        case types.pedidoProductAdd:
            return {
                ...state,
                productsTable: [...state.productsTable, action.payload]
                // products: state.products.map((producto) => 
                //     producto.id === action.payload.id
                //         ? {
                //             ...producto,
                //             quantity:
                //                 parseInt(producto.fardos) + 
                //                 parseInt( action.payload.fardos )
                //         }
                //         : [ ...state.products, action.payload ]
                // )
            }
        case types.pedidoProductAdd2:
            console.log('holi')
            return {
                ...state,
                productsTable2: [...state.productsTable2, action.payload]
                // products: state.products.map((producto) => 
                //     producto.id === action.payload.id
                //         ? {
                //             ...producto,
                //             quantity:
                //                 parseInt(producto.fardos) + 
                //                 parseInt( action.payload.fardos )
                //         }
                //         : [ ...state.products, action.payload ]
                // )
            }
        
    
        default:
            return state;
    }
}