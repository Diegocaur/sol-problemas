import {useState} from 'react';
import {supabase} from './api/index.js'

export default function LogIn({roles}){
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [rut,setRut]= useState();
    const [nombre,setNombre]= useState('');
    const [edad,setEdad]= useState();
    const [direccion,setDireccion]= useState('');
    const [idRol,setIdRol] = useState();
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
    return (
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
                    <div>
                        <input type="radio" value={e.id_roles} name="idRol"/>
                        <label>{e.nombre_rol}</label>
                    </div> ))}
            </div>
            <button type='submit'>Crear cuenta</button>
        </form>
    );
}

export async function getStaticProps(){
    const {data,err} = await supabase.from('roles').select("id_roles,nombre_rol");
    return {
        props:{roles:data,},
    };
}