import Menu from "./components/menu";
import React, { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//npm i reactstrap react react-dom
import {
  Table,
  Button,
  Container,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default function Historial() {
  const user = useUser();
  const [rol, setRol] = useState(-1);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    async function loadData() {
      let { data: id_rol } = await supabaseClient
        .from("profiles")
        .select("id_rol")
        .eq("id_usuario", user.id);
      setRol(id_rol[0].id_rol);
    }

    if (user) loadData();
  }, [user]);
  return (
    <div>
      <Menu userRole={rol}></Menu>
      <>
        <Button>Insertar</Button>
      </>
    </div>
  );
}
