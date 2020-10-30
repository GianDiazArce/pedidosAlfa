import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

// import './authStyles.css';

/*
  Observaciones: 
    - Probar diferentes cuentas y creaciones
    - Validar al administrador ( Opcion: Ruta secreta )
    - Al loguearse que solo se logueen con el nombre
*/

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initUser = {
    name: "",
    email: "",
    password: "",
    password2: ""
}

export const RegisterScreen = () => {
  const classes = useStyles();
  const [ formValues, handleInputChange, reset ] = useForm(initUser);
  const { name, email, password, password2 } = formValues;
  const { msgError } = useSelector((state) => state.ui);
  const dispatch = useDispatch();


  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName( email, password, name ));
      reset();
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("El nombre es obligatorio"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("El email no es valido"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "La contraseña debe tener 6 caracteres minimos y deben coincidir"
        )
      );
      return false;
    }
    dispatch(removeError());

    return true;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} autoComplete="off" onSubmit={ handleRegisterSubmit } noValidate>
          {msgError && <div className="auth_alert_error py-2 my-3"> * {msgError}</div>}
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Nombre"
                autoFocus
                value={ name }
                onChange={ handleInputChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                name="email"
                value={ email }
                onChange={ handleInputChange }
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                value={ password }
                onChange={ handleInputChange }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirma tu contraseña"
                type="password"
                value={ password2 }
                onChange={ handleInputChange }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
        </form>
      </div>
    </Container>
  );
};
