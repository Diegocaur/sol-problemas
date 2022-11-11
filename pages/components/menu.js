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
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                    <img src="logo_navbar.png" alt="Logo" width="30" height="30" class=" d-inline-block align-text-top"></img>
                    UCM PSICI</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {userRole===1?<>
                            <Link href='../'><a className="nav-link active" aria-current="page" href="#">Inicio</a></Link>
                            <Link href='../admin-usuario'><a className="nav-link" href="#">Usuarios</a></Link>
                            <Link href='../admin-carrera'><a className="nav-link" href="#">Carrera</a></Link></>
                            :userRole!==4?
                            <>
                            <Link href='../preguntas-frecuentes'><a className="nav-link" href="#">Preguntas frecuentes</a></Link>
                            <Link href='../consultas'><a className="nav-link" href="#">Consultas</a></Link>
                            {/* <Link href='../'></Link> */}
                            <Link href='../cuenta'><a className="nav-link" href="#">Cuenta</a></Link>
                            </>:
                            <><Link href='../consultas'><a className="nav-link" href="#">Consultas</a></Link>
                            <Link href='../historial'><a className="nav-link" href="#">Historial</a></Link>
                            <Link href='../general'><a className="nav-link" href="#">General</a></Link>
                            <Link href='../cuenta'><a className="nav-link" href="#">Cuenta</a></Link></>}
                        
                            
                        </div>
                        
                        
                    </div>
                    <div className='nav justify-content-end'>
                        <button className="btn btn-outline-dark" onClick={logOut}>Cerrar sesión</button></div>
                </div>
            </nav>
        </div>
    )
}


           
