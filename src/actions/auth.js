import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from 'sweetalert2'
import { firebase } from '../firebase/firebase-config'




export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                await user.updateProfile({ displayName: name })
                Swal.fire('Success', 'El usuario fue registrado correctamente', 'success');
            })
            .catch(e => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            }) ;
    }
}

export const startLoginWithEmailAndPassword = ( email, password ) => {
    return ( dispatch ) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({user}) => {
                dispatch( login(user.uid, user.displayName) );
                dispatch(finishLoading());
            })
            .catch( e => {
                dispatch(finishLoading());
                // Swal.fire('Error', e.message, 'error');
                var mensajeErrorLogin = '';
                if( e.code === 'auth/wrong-password' ){
                    mensajeErrorLogin = 'La contraseña es incorrecta'
                } else {
                    mensajeErrorLogin = 'El username no es valido'
                }
                Swal.fire('Error', mensajeErrorLogin , 'error');
            } )
    }
}
export const startLogout = () => {

    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch( logout() );
    }

}
export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const logout = () => ({
    type: types.logout
})