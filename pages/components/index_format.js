import {useState,useEffect} from 'react';
//import {supabase} from './api/index.js';
import {useRouter} from 'next/router';
import { useSession,useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


export default function Index_menu(){
    return (
        <div>
            <div className="container-fluid background-index text-center bg-dark">
                <div className='container d-flex justify-content-center align-items-center p-5'>
                    <div className="row">
                            <div className='col-md'>
                                <div className='card' style={{width: "20rem"}}>
                                    <img class="card-img-top" src="../sitio-web.png" alt="Card image cap"/>
                                    <div class="card-body">
                                    <h5 class="card-title">Preguntas y Respuestas</h5>
                                    <p class="card-text justify-content-center">Ingresando por este link podrás ingresar a las preguntas y respuestas de los alumnos. (beta)</p>
                                    <a href='../preguntas-frecuentes' className='btn btn-outline-secondary' target="_blank">Ingresa aqui</a>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md'>
                                <div className='card' style={{width: "20rem"}}>
                                    <img class="card-img-top" src="../triangulo.png" alt="Card image cap"/>
                                    <div class="card-body">
                                    <h5 class="card-title">Solicitudes </h5>
                                    <p class="card-text justify-content-center">Ingresando con este link podrás ingreasar a las solicitudes de los alumnos. (Solo subir solicitudes; beta)</p>
                                    <a href='../realiza-consulta' className='btn btn-outline-secondary' target="_blank">Ingresa aqui</a>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div> 
            </div>
        </div>

        

        );
    }