import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Auth,ThemeSupa} from '@supabase/auth-ui-react';
import { useSession,useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState,useEffect} from 'react';
import Account from './account';
import LogIn from './login';
import Menu from './components/menu.js';

export default function Usuarios() {
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
  return (
    <div>
    <Menu userRole={data}></Menu>
  </div>
  )
}