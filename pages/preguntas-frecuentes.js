import {useState,useEffect} from 'react';
import {supabase} from './api/index.js';
import Menu from './components/menu.js';
import {useRouter} from 'next/router';
import {useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


export default function PreguntasFrecuentes({}){
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const [rol,setRol] = useState(-1);
    const [preguntasFrecuentes,setPreguntasFrecuentes] = useState([]);
    const [pregunta,setPregunta]= useState('');
    const [respuesta,setRespuesta]= useState('');
    const [carrera,setCarrera] = useState(-1);
    const [editarPreguntaYRespuesta,setEditaPreguntaYRespuesta] = useState({indice:-1,esPregunta:null});
    const [editarNuevaPregunta,setEditarNuevaPregunta]= useState('');
    const [editarNuevaRespuesta,setEditarNuevaRespuesta]= useState('');
    useEffect(()=>{
        async function loadData(){
            let {data:id_rol }= await supabaseClient.from('profiles').select('id_rol').eq('id_usuario',user.id);
            setRol(id_rol[0].id_rol); 
            if(rol===2){
                let {data:carrera,error} = await supabaseClient.from('carrera').select('id_carrera').eq('id_director',user.id);
                setCarrera(carrera[0].id_carrera);
                let {data:pregFrec} = await supabaseClient.from('preguntas_frecuentes').select('*').eq('id_carrera',carrera[0].id_carrera).order('id_preguntas',{ascending:true});
                console.log(pregFrec);
                setPreguntasFrecuentes(pregFrec);
            }
            if(rol===3){
                let {data:carrera,error} = await supabaseClient.from('carrera').select('id_carrera').eq('id_secretaria',user.id);
                setCarrera(carrera[0].id_carrera);
                let {data:pregFrec} = await supabaseClient.from('preguntas_frecuentes').select('*').eq('id_carrera',carrera[0].id_carrera).order('id_preguntas',{ascending:true});
                setPreguntasFrecuentes(pregFrec);
            }
        }
        if(user) loadData()
    },[user])

    const agregarPreguntaYRespuesta= async ()=>{
        try{
            let {data,error} = await supabaseClient.from('preguntas_frecuentes')
                                    .insert([{id_carrera:carrera,pregunta:pregunta,respuesta:respuesta}]);
            if (error) throw error
            window.location.reload();
        }catch(error){
            alert(err.error_description||err.message)
            
        }
    }
    const editarPreguntaFrecuente = async (id)=>{
        try{
            let {data,error}= await supabaseClient.from('preguntas_frecuentes')
                                    .update({pregunta:editarNuevaPregunta})
                                    .eq('id_preguntas',id);
            window.location.reload();
        }

        catch(error){
            alert(err.error_description||err.message)
        }
    }
    const editarRespuestaFrecuente = async (id)=>{
        try{
            let {data,error}= await supabaseClient.from('preguntas_frecuentes')
                                    .update({respuesta:editarNuevaRespuesta})
                                    .eq('id_preguntas',id);
            window.location.reload();
        }

        catch(error){
            alert(err.error_description||err.message)
        }
    }
    const eliminarPreguntaYRespuesta = async(id)=>{
        try{
            let {data,error}= await supabaseClient.from('preguntas_frecuentes')
                                    .delete()
                                    .eq('id_preguntas',id);
            window.location.reload();
        }
        catch(error){
            alert(err.error_description||err.message)
        }
    }
    return (
        <div>
            <Menu userRole={rol}></Menu>
            <>
            {preguntasFrecuentes.map((e)=>(<div key={e.id_preguntas}>
                <h1>{e.pregunta}
                    <button 
                    onClick={()=>{editarPreguntaYRespuesta.indice===-1?
                    setEditaPreguntaYRespuesta({'indice':e.id_preguntas,'esPregunta':true}):
                    setEditaPreguntaYRespuesta({indice:-1,esPregunta:null})}}>
                        Editar Pregunta</button>
                </h1>
                    {editarPreguntaYRespuesta.indice===e.id_preguntas && editarPreguntaYRespuesta.esPregunta===true? 
                    (<form onSubmit={()=>editarPreguntaFrecuente(e.id_preguntas)}>
                        <label>Nueva Pregunta</label>
                        <input type='text' value={editarNuevaPregunta} onChange={(e)=>{setEditarNuevaPregunta(e.target.value)}}></input>
                        <button type='submit'>Cambiar</button>
                    </form>):(<></>)
                    }
                
            <p>{e.respuesta}
                <button
                onClick={()=>{editarPreguntaYRespuesta.indice===-1?
                    setEditaPreguntaYRespuesta({'indice':e.id_preguntas,'esPregunta':false}):
                    setEditaPreguntaYRespuesta({indice:-1,esPregunta:null})}}
                >Editar Respuesta</button>
            </p>
                    {editarPreguntaYRespuesta.indice===e.id_preguntas && editarPreguntaYRespuesta.esPregunta===false? 
                    (<form onSubmit={()=>editarRespuestaFrecuente(e.id_preguntas)}>
                        <label>Nueva Respuesta</label>
                        <input type='text' value={editarNuevaRespuesta} onChange={(e)=>{setEditarNuevaRespuesta(e.target.value)}}></input>
                        <button type='submit'>Cambiar</button>
                    </form>):(<></>)
                    }
                <button onClick={()=>eliminarPreguntaYRespuesta(e.id_preguntas)}>Eliminar Pregunta y respuesta</button>
            </div>))}
            <form onSubmit={agregarPreguntaYRespuesta}>
                <p>
                    <input type={'text'} value={pregunta} onChange={(e)=>{setPregunta(e.target.value)}}/>
                    <label>Pregunta</label></p>
                <p>
                    <input type={'text'} value={respuesta} onChange={(e)=>{setRespuesta(e.target.value)}}/>
                    <label>Respuesta</label>
                </p>
                <button type='submit'>Agregar Pregunta y Respuesta</button>
            </form>
            </>
        </div>
        
        );
    }