import React from "react";
import { useForm } from "../../hooks/useForm";

const initNewProductState = {
  newProductCode: "",
  newProductName: "",
  newProductFamily: "",
  newProductUM: "",
};

export const ProductosScreen = () => {
  const [formValues, handleInputChange] = useForm(initNewProductState);

  const {
    newProductCode,
    newProductName,
    newProductFamily,
    newProductUM,
  } = formValues;

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div>
      <h3>Pedidos</h3>
      <hr className="mb-0 mt-1" />
      <span className="help-text py-2">Aqui se registraran los pedidos</span>

      <div className="card mt-3">
        <h5 className="card-header">Productos</h5>
        <div className="card-body">
          <form onSubmit={handleNewProductSubmit}>
            <div className="form-group">
              <label htmlFor="newProductCode">Codigo de articulo</label>
              <input
                type="text"
                name="newProductCode"
                id="newProductCode"
                className="form-control"
                aria-describedby="helpIdnewProductCode"
                value={ newProductCode }
                onChange={ handleInputChange }
              />
              <small id="helpIdnewProductCode" className="text-muted">
                Codigo del producto
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="newProductName">Nombre del producto</label>
              <input
                type="text"
                name="newProductName"
                id="newProductName"
                className="form-control"
                aria-describedby="helpIdnewProductName"
                value={ newProductName }
                onChange={ handleInputChange }
              />
              <small id="helpIdnewProductName" className="text-muted">
                Nombre o descripcion del producto
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="newProductFamily">Familia del producto</label>
              <input
                type="text"
                name="newProductFamily"
                id="newProductFamily"
                className="form-control"
                aria-describedby="helpIdnewProductFamily"
                value={ newProductFamily }
                onChange={ handleInputChange }
              />
              <small id="helpIdnewProductFamily" className="text-muted">
                Familia del producto
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="newProductUM">Unidad de medida</label>
              <input
                type="text"
                name="newProductUM"
                id="newProductUM"
                className="form-control"
                aria-describedby="helpIdnewProductUM"
                value={ newProductUM }
                onChange={ handleInputChange }
              />
              <small id="helpIdnewProductUM" className="text-muted">
                Familia del producto
              </small>
            </div>

            <button className="btn btn-success">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
