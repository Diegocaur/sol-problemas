import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Auth,ThemeSupa} from '@supabase/auth-ui-react';
import {useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState,useEffect} from 'react';
import Account from './account';
import Menu from './components/menu.js';

export default function Consultas({}){
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const [data,setData] = useState();
    const [texto,setTexto] = useState();
    const [carrera,setCarrera] = useState(-1);
    const [director,setDirector] = useState();
    const [idTicket,setIdTicket] = useState();
    useEffect(()=>{
        async function loadData(){
            const {data }= await supabaseClient.from('profiles').select('id_rol').eq('id_usuario',user.id);
            //console.log(data[0].id_rol );
            setData(data[0].id_rol); 
            let {data:carrera,error} = await supabaseClient.from('estudiantes_carrera')
                .select('id_carrera,carrera(id_director)').eq('id_estudiante',user.id);
            //console.log(carrera[0].carrera.id_director);
            setCarrera(carrera[0].id_carrera);
            setDirector(carrera[0].carrera.id_director);

        }
        if(user) loadData()
    },[user]);
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
    const crearConsulta = async ()=>{
        try{
            
            const {data:ticket}= await supabaseClient
                                .from('ticket')
                                .insert([{estado_ticket:1,id_sol:user.id ,id_rec:director}])
                                .select();
            //ticket
            console.log(data);
            setIdTicket(data[0].id_ticket);
            const {error} = await supabaseClient
                                .from('mensaje')
                                .insert([{id_ticket:data[0].id_ticket,mensaje:texto,id_usuario:user.id}]);
            
        }
        catch(error){
            alert(err.error_description||err.message)

        }
    }
    return (
        <div>
            <Menu userRole={data}></Menu>
            <div>Crear consulta</div>
            <form /* onSubmit={crearConsulta} */>
            <p><textarea row='10' cols="100" value={texto} onChange={(e)=>setTexto(e.target.value)}></textarea></p>
            <button /* type='submit' */ onClick={crearConsulta}>Enviar Consulta</button>
            </form>
        </div>
        
        );
    }