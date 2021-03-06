import React from "react";

import Swal from "sweetalert2";
import axios from "axios";
import { axiosConfig } from "../../helpers/axios-config";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../../services/usuarios-services";
import { NavBar } from "../../components/navBar/NavBar";

export function EditUsuario() {

  const { id } = useParams();

  const [usuario, setUsuario] = useState({});
  const [dataForm, setDataForm] = useState({});

  const { nombreUser ='' , email ='' , estado ='' } = dataForm;

  const getUsuario = async () => {
    try {
      const usuario = await API.getUsuario(id);
      setUsuario(usuario);
      console.log(usuario);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setDataForm({
      nombreUser: usuario.nombre,
      email: usuario.email,
      estado: usuario.estado
    });
  }, [usuario]);

  useEffect(() => {
    getUsuario();
  },[id]);


  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data ={
      nombre:nombreUser,
      email,
      estado
    }
    console.log(data);
    try {
      const response = await axiosConfig.put(`/usuarios/${id}`, data, {
          headers:{
            'Content-Type':'application/json'
          }
      })

      console.log(response);
    } catch (error) {
      console.log(error);      
    }

  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row my-3">
          <div className="col-12">
            <h1 className="text-center">Editar usuario </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div
              className="card border-secondary mb-3"
              style={{ width: 30 + "rem" }}
            >
              <div class="card-body text-secondary text-">
                <h5 class="card-title text-center"> {usuario.nombre} </h5>
                <p class="card-text text-center">Editar usuario!</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group my-2">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombreUser"
                      value={nombreUser}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group my-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group my-2">
                    <label>Estado</label>
                    <select
                      className="form-control"
                      name="estado"
                      value={estado}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione un estado</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mx-3">
                      Actualizar
                    </button>
                    <Link to="/usuarios" className="btn btn-secondary mx-3">
                      Volver
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
