import {useState,useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
//import {supabase} from '../api/index.js'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Menu({userRole}){
    const supabaseClient = useSupabaseClient();
    const [roles,setRoles] = useState();
    const logOut =async (event)=>{
        event.preventDefault();
        try{
            let {error} = await supabaseClient.auth.signOut();
            if(error) throw error
        }catch(error){
            alert(error.error_description||error.message);
        }
    }
    useEffect(()=>{
        async ()=>{
        const {data}= await supabaseClient.from('roles').select("*");
        console.log(data);
        setRoles(data);}
    },[])
    return (
        <div>
            
            <Link href='../'>Inicio</Link>
            {userRole===1?<>
            <Link href='../admin-usuario'>Usuarios</Link>
            <Link href='../admin-carrera'>Carrera</Link></>
            :userRole!==4?
            <>
            <Link href='../preguntas-frecuentes'>Preguntas frecuentes</Link>
            <Link href='../consulta'>Consultas</Link>
            {/* <Link href='../'></Link> */}
            <Link href='../cuenta'>Cuenta</Link>
            </>:
            <><Link href='../consulta'>Consultas</Link>
            <Link href='../historial'>Historial</Link>
            <Link href='../general'>General</Link>
            <Link href='../cuenta'>Cuenta</Link></>}
            
            <button onClick={logOut}>Cerrar sesión</button>
        </div>
    );
}

