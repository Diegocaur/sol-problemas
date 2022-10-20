import {useState,useEffect} from 'react';
import {supabase} from './api/index.js';
import Menu from './components/menu.js';
import {useRouter} from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


export default function Carrera({carreras}){
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const [data,setData] = useState();
    const [nuevaCarrera,setNuevaCarrera] = useState('');
    useEffect(()=>{
        async function loadData(){
            const {data }= await supabaseClient.from('profiles').select('id_rol').eq('id_usuario',user.id);
            //console.log(data[0].id_rol );
            setData(data[0].id_rol); 
        }
        if(user) loadData()
    },[user])
    const handleSubmit=async (event)=>{
        try{
            const {data,error} = await supabaseClient.from('carrera').insert([{nombre:nuevaCarrera}]);
            setNuevaCarrera('');
            window.location.reload();
            if (error) throw error
        }catch(err){
            alert(err.error_description||err.message)
        }
    }
    const removeCarrera= async (id)=>{
        try{
            const { data, error } = await supabase
                                .from('carrera')
                                .delete()
                                .eq('id_carrera', id);
            if(error) throw error
            window.location.reload();
        }
        catch(err){
            alert(err.error_description||err.message)
        }
        
    }
    return (
        <div>
            <Menu userRole={data}></Menu>
            <ul>
            {carreras.map((e)=>(<li id={e.id_carrera} key={e.id_carrera}>{e.id_carrera} {e.nombre}<button onClick={()=>(removeCarrera(e.id_carrera))}>Borrar</button></li>))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type={'text'} value={nuevaCarrera} onChange={(e)=>{setNuevaCarrera(e.target.value)}} />
                <label>Nombre Carrera</label>
                <button type='submit'>Agregar carrera</button>
            </form>
        </div>
        );
    }

export async function getStaticProps(){
    const {data,err} = await supabase.from('carrera').select("*");
    return {
        props:{carreras:data,},
    };
}