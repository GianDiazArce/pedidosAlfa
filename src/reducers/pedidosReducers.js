import { types } from "../types/types";


const initialPedidoState = {
    products: [],
}

export const pedidosReducers = ( state = initialPedidoState, action ) => {
    switch (action.type) {
        case types.pedidoProductsByFamily:
            return {
                ...state,
                products: [ ...action.payload ]
            }

    
        default:
            return state;
    }
}