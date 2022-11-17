import Head from 'next/head'
import Image from 'next/image'
import {Auth,ThemeSupa} from '@supabase/auth-ui-react';
import {supabase} from '../api/index.js';
import { useSession,useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState,useEffect} from 'react';
import Account from '../account';
import LogIn from '../login';
import Menu from './menu.js';

export default function Usuario({usuarios,roles}) {
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [rut,setRut]= useState();
    const [nombre,setNombre]= useState('');
    const [edad,setEdad]= useState();
    const [direccion,setDireccion]= useState('');
    const [idRol,setIdRol] = useState();
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const [data,setData] = useState();
    const [edita,setEdita] = useState(-1);
    //datos para editar
    const [nombreEditar,setNombreEditar] = useState("");
    const [edadEditar,setEdadEditar] = useState("");
    const [dirEditar,setDirEditar] = useState("");
    const [activaEditar,setActivaEditar] = useState("");
    const [rolEditar,setRolEditar] = useState("");
    useEffect(()=>{
        async function loadData(){
            const {data }= await supabaseClient.from('profiles').select('id_rol').eq('id_usuario',user.id);
            setData(data[0].id_rol); 
            //console.log(roles);
        }
        if(user) loadData()
    },[user])
    const handleSignUp=async (event)=>{
        event.preventDefault();
        try{
            let { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        rut:parseInt(rut),
                        nombre:nombre,
                        edad:parseInt(edad),
                        direccion:direccion,
                        esta_activa:true,
                        id_rol:idRol,
                        }
                    }
              });
              if(error) throw error
        }catch(err){
            alert(err.error_description||err.message)
        }
    }

    /* const editarCuenta= async (event,)=>{
        event.preventDefault();
        try{

        }catch(error){
            alert(err.error_description||err.message)

        }
    } */

  return (
    <div>
    <Menu userRole={data}></Menu>
    <ul>
        <li key={-1}>ID RUT NOMBRE EDAD DIRECCION ESTA_ACTIVA ROL</li>
    {usuarios.map((e)=>(<li key={e.rut}>{/* {console.log(roles[0].nombre_rol)} */}{e.id_usuario} {e.rut} {e.nombre} {e.edad} {e.direccion} {String(e.esta_activa)} {roles[e.id_rol-1].nombre_rol}
    <button onClick={()=>{edita===-1?setEdita(e.rut):setEdita(-1)}}>Editar</button>
    <button>Borrar</button>
    {e.rut===edita && (<p>
        <label>Nombre: </label><input value={nombreEditar} onChange={(e)=>setNombreEditar(e.target.value)}></input>
        <label> Edad: </label><input type="number" value={edadEditar} onChange={(e)=>setEdadEditar(e.target.value)}></input>
        <label> Dirección: </label><input value={dirEditar} onChange={(e)=>setDirEditar(e.target.value)}></input>
        <label> ¿Está activa?: </label><input value={activaEditar} onChange={(e)=>setActivaEditar(e.target.value)}></input>
    </p>)}
    </li>))}
    </ul>
    <div>Agregar Usuario</div>
    <form onSubmit={handleSignUp}>
            <div>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Correo</label>
            </div>
            <div>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <label>Contraseña</label>
            </div>
            <div>
                <input type="text" value= {rut} onChange={(e)=> setRut(e.target.value)} />
                <label>Rut</label>
            </div>
            <div>
                <input type="text" value= {nombre} onChange={(e)=>setNombre(e.target.value)} />
                <label>Nombre</label>
            </div>
            <div>
                <input type="number" value= {edad} onChange={(e)=>setEdad(e.target.value)} />
                <label>Edad</label>
            </div>
            <div>
                <input type="text" value= {direccion} onChange={(e)=>setDireccion(e.target.value)} />
                <label>Dirección</label>
            </div>
            <div onChange={(e)=>setIdRol(e.target.value)}>
                <p>Rol</p>
                {roles.map((e)=>(
                    <div key={e.id_rol}>
                        <input type="radio" value={e.id_roles} name="idRol"/>
                        <label>{e.nombre_rol}</label>
                    </div> ))}
            </div>
            <button type='submit'>Crear cuenta</button>
        </form>
  </div>
  )
}

export async function getStaticProps(){
    const {data:profiles,err} = await supabase.from('profiles').select("*").order('id_usuario',{ascending:true});
    const {data:roles} = await supabase.from('roles').select("*");
    //console.log(roles[0]);
    return {
        props:{usuarios:profiles, roles:roles},
    };
}