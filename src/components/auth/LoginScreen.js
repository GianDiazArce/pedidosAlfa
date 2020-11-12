import React from 'react'
import { Avatar, Button, Container, CssBaseline, makeStyles, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from '@material-ui/icons'
import { useForm } from '../../hooks/useForm';
import { startLoginWithEmailAndPassword } from '../../actions/auth';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
  
const initLoginState = {
    username: '',
    password: ''
}

export const LoginScreen = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const [ formValues, handleInputChange ] = useForm(initLoginState);

    const { username, password } = formValues

    /*
        Observaciones: 
            - Iniciar Sesion
            - Agregar formato de pedido
    */ 

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const lowerUsername = username.toLowerCase();
        if(lowerUsername === 'invitado'){
            const invitadoUser = lowerUsername+'@invitado.com';
            dispatch( startLoginWithEmailAndPassword( invitadoUser, password ) );
        } else {

            dispatch( startLoginWithEmailAndPassword( lowerUsername, password ) );
        }
        
        
         
        
    }

    return (
        <Container autoComplete="off" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                Iniciar Sesión
                </Typography>
                <form className={classes.form} onSubmit={ handleLoginSubmit } autoComplete="off" noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Usuario"
                    name="username"
                    autoFocus
                    value={ username }
                    onChange={ handleInputChange }
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Codigo de Acceso"
                    type="password"
                    autoComplete="current-password"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Ingresar
                </Button>
                </form>
            </div>
        </Container>
    )
}
