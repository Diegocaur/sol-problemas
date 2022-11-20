import {useState,useEffect} from 'react';
import {supabase} from './api/index.js';
import Menu from './components/menu.js';
import {useRouter} from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Popup from "./components/popup.js";

export default function Carrera({carreras}){
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const [data,setData] = useState();
    const [nuevaCarrera,setNuevaCarrera] = useState('');
    //indice de carrera a editar
    const [editaCarrera,setEditaCarrera] = useState(-1);
    //info de carrera a editar
    const [nombreEditaCarrera,setNombreEditaCarrera] = useState('');
    useEffect(()=>{
        async function loadData(){
            const {data }= await supabaseClient.from('profiles').select('id_rol').eq('id_usuario',user.id);
            setData(data[0].id_rol); 
        }
        if(user) loadData()
    },[user])
    const handleSubmit=async (event)=>{
        try{
            const {data,error} = await supabaseClient.from('carrera').insert([{nombre:nuevaCarrera}]);
            setNuevaCarrera('');
            if (error) throw error
            window.location.reload();
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
    const editarCarrera = async (id)=>{
        try{
            const {data,error} = await supabase 
                                .from('carrera')
                                .update({nombre:nombreEditaCarrera})
                                .eq('id_carrera',id);
            if(error) throw error
            setNombreEditaCarrera('');
            setEditaCarrera(-1);
            
            window.location.reload();
        }
        catch(err){
            alert(err.error_description||err.message)
        }
    }

    return (
        <div>
            <Menu userRole={data}></Menu>
            <div className='text-center pt-5'>
                <button className="btn btn-primary"  onClick={() => setButtonPopup(true)}>Añadir Carrera</button>
            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <div class="container text-center">
                    <form onSubmit={handleSubmit}>
                        <input type={'text'} value={nuevaCarrera} onChange={(e)=>{setNuevaCarrera(e.target.value)}}/>
                        <label>Nombre Carrera</label>
                        <button type='submit'>Agregar carrera</button>
                    </form>
                </div>
            </Popup>
            <div class="container_table"> 
                <table>
                    <thead>
                        <tr>
                            <th>Id Carrera</th>
                            <th>Nombre Carrera</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    {carreras.map((e)=>{
                        return (
                    <tr key={e.id_carrera}>
                        <th>{e.id_carrera}</th> 
                        <th>{e.nombre}</th>
                        <th><button class="btn btn-warning" onClick={()=>{
                            
                            if(editaCarrera===-1) {
                                setEditaCarrera(e.id_carrera);                     
                            }
                            else
                                setEditaCarrera(-1);
                            setButtonPopup2(true);

                        }}>Editar</button></th>
                        <th><button class="btn btn-danger" onClick={()=>(removeCarrera(e.id_carrera))}>Borrar</button></th>
                        
                        {e.id_carrera===editaCarrera && (
                        <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
                            <div class="container text-center">
                                <form onSubmit={()=>editarCarrera(e.id_carrera)}>
                                    <label>Nuevo nombre</label>
                                    <input value={nombreEditaCarrera} onChange={(e)=>{setNombreEditaCarrera(e.target.value)}}></input>
                                    <button type='submit'>Cambiar</button>
                                </form>
                            </div>
                        </Popup>)}
                    </tr>
                    )})}
                    </tbody>
                </table>
                
            </div>
        </div>
        );
    }

export async function getStaticProps(){
    const {data,err} = await supabase.from('carrera').select("*").order('id_carrera',{ascending:true});
    return {
        props:{carreras:data,},
    };
}