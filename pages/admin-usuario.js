import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Auth,ThemeSupa} from '@supabase/auth-ui-react';
import {supabase} from './api/index.js';
import { useSession,useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState,useEffect} from 'react';
import Account from './account';
import LogIn from './login';
import Menu from './components/menu.js';
import Popup from "./components/popup.js";
import {useRouter} from 'next/router';


export default function Usuarios({usuarios,roles}) {
    const [buttonPopup, setButtonPopup] = useState(false);
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
    //router 

    const router = useRouter();

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
              //recarga la pagina
              router.reload();
        }catch(err){
            alert(err.error_description||err.message)
        }
    }

    const editarCuenta= async (id)=>{
        try{
            const {data, error} = await supabaseClient.from('profiles').update({nombre:nombreEditar,edad:edadEditar,direccion:dirEditar}).eq('id_usuario',id);
            if (error) throw error;
            router.reload();

        }catch(err){
            alert(err.error_description||err.message)

        }
    }
    const borrarCuenta = async (id )=>{
        try{
            const {data,error} = await supabaseClient.from('profiles').delete().eq('id_usuario',id);
            if (error) throw error;
            router.reload();

        }
        catch(err){
            alert(err.error_description||err.message)
        }
    }
  return (
    <div>
    <Menu userRole={data}></Menu>
    <div class="container_table">
            <table >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RUT</th>
                        <th>NOMBRE</th>
                        <th>EDAD</th>
                        <th> DIRECCION</th>
                        <th>ROL</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {usuarios.map((e)=>{
                        return (
                            
                    <tr key={e?.rut}>
                        <td>{e?.id_usuario}</td>
                        <td>{e?.rut}</td>
                        <td>{e?.nombre}</td>
                        <td>{e?.edad}</td>
                        <td>{e?.direccion}</td> 
                        {/* <td>{e.esta_activa}</td> */}
                        <td>{roles[e.id_rol-1].nombre_rol}</td>
                        <td><button style = {{color: "white"}} onClick={()=>{edita===-1?setEdita(e?.rut):setEdita(-1)}} class="btn btn-warning">Editar</button></td>
                        <td><button class="btn btn-danger" onClick={()=>{borrarCuenta(e.id_usuario)}}>Borrar</button></td>
                        {e?.rut===edita && (<p>
                            <form onSubmit={()=>editarCuenta(e.id_usuario)}>
                                <label>Nombre: </label><input value={nombreEditar} onChange={(e)=>setNombreEditar(e.target.value)}></input>
                                <label> Edad: </label><input type="number" value={edadEditar} onChange={(e)=>setEdadEditar(e.target.value)}></input>
                                <label> Dirección: </label><input value={dirEditar} onChange={(e)=>setDirEditar(e.target.value)}></input>
                                <button type="submit">Cambiar</button>
                            </form>
                        </p>)}
                    </tr>
                    
                    )
                })}

                </tbody>
            </table>
    </div>
    <div className='text-center'>
    <button onClick={() => setButtonPopup(true)}>gueta puto</button>
    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div >Agregar Usuario</div>
        <form action="#" onSubmit={handleSignUp}>
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
            <button href="./admin-usuario" type='submit'>Crear cuenta</button>
        </form>
    </Popup>
    </div>
  </div>
  )
}

export async function getStaticProps(){
    const {data,err} = await supabase.from('profiles').select("*").order('id_usuario',{ascending:true});
    const {data:roles} = await supabase.from('roles').select("*");
    console.log(roles);
    return {
        props:{usuarios:data,roles:roles,},
    };
}