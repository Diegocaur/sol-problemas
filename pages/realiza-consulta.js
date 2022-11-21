//npm i sweetalert
//npm i react-select

import React, { useState, useEffect } from "react";
import Menu from "./components/menu.js";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { supabase } from "./api/index.js";

import StableSelect from "./components/StableSelect";
import swal from "sweetalert";

export default function Categorias({ categorias, responsables }) {
  const user = useUser();
  const [rol, setRol] = useState(-1);
  const supabaseClient = useSupabaseClient();

  //Obtener el rol de la persona en la pagina
  useEffect(() => {
    async function loadData() {
      let { data: id_rol } = await supabaseClient
        .from("profiles")
        .select("id_rol")
        .eq("id_usuario", user.id);
      setRol(id_rol[0].id_rol);
    }

    if (user) loadData();
    console.log(responsables);
  }, [user]);

  //----------------------------------------------------
  //-----Ventana de Confirmación------------

  const mostrarAlerta = async (e) => {
    e.preventDefault();
    swal({
      title: "Enviar Consulta",
      text: "Estás seguro que deseas subir tu consulta",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        subirrMensaje(e);
        swal({
          text: "Consulta Enviada Exitosamente",
          icon: "success",
          timer: "30000",
        });
        location.reload();
      }
    });
  };
  //------------------------------------------------------------
  //------Para Subir Consulta
  const subirrMensaje = async (e) => {
    try {
      const result = await supabaseClient.from("consultas").insert({
        mensaje: selectedMensaje,
        categoria: selectedCategoria,
        encargado: selectedResponsable,
        userId: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Para almacenar la categoria y responsable seleccionado y mensaje

  const [selectedCategoria, setSelectedCategoria] = useState();
  const [selectedResponsable, setSelectedResponsable] = useState();
  const [selectedMensaje, setSelectedMensaje] = useState();

  //Para Cambios en Categorias
  const handleSelectChange = ({ value }) => {
    setSelectedCategoria(value);
  };
  //Para Cambios en Responsables
  const handleSelectChange2 = ({ value }) => {
    setSelectedResponsable(value);
  };

  const handleSelectChange3 = (e) => {
    setSelectedMensaje(e.target.value);
  };

  return (
    <div>
      <Menu userRole={rol}></Menu>

      <>
        <div className="padding-selection">
          <h2 className="centrar-h2">Sube tu consulta</h2>
        </div>
        <div className="padding-selection" id="1">
          <p>Categorias: {selectedCategoria} </p>
          <StableSelect
            defaultValue={{ label: "Selecciona una opción", value: "empty" }}
            options={categorias.map((sup) => ({
              label: sup.nombre,
              value: sup.nombre,
              id: sup.id_categoria,
            }))}
            onChange={handleSelectChange}
          />
        </div>
        <div className="padding-selection">
          <p>Encargado Consulta: {selectedResponsable} </p>
          <StableSelect
            defaultValue={{ label: "Selecciona una opción", value: "empty" }}
            options={responsables.map((sup) => ({
              label: sup.nombre_rol,
              value: sup.nombre,
              id: sup.id_usuario,
            }))}
            onChange={handleSelectChange2}
          />
        </div>
        <div className="padding-selection">
          <p>Descripción: </p>
          <form onSubmit={mostrarAlerta}>
            <textarea
              className="textarea"
              rows="5"
              onChange={handleSelectChange3}
            ></textarea>
            <div className="center">
              <button className="boton">Enviar Consulta</button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
}

export async function getStaticProps() {
  const { data, err } = await supabase.from("profiles").select("*");

  const { data: roles } = await supabase.from("roles").select("*");

  //------------------------------------------------------
  const { data: Responsables } = await supabase.from("roles").select("*");
  Responsables.splice(2);

  //----------------------------------------------------------
  const { data: elementos } = await supabase
    .from("categoria")
    .select("*")
    .order("id_categoria", { ascending: true });
  return {
    props: {
      usuarios: data,
      roles: roles,
      categorias: elementos,
      responsables: Responsables,
    },
  };
}
