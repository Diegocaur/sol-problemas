import {useState,useEffect} from 'react';
//import {supabase} from './api/index.js';
import Menu from './components/menu.js';
import {useRouter} from 'next/router';
import { useSession,useUser, useSupabaseClient } from '@supabase/auth-helpers-react';


export default function Account({user}){
    const supabaseClient = useSupabaseClient();
    const [data,setData] = useState();
    useEffect(()=>{
        async function loadData(){
            const {data }= await supabaseClient.from('profiles').select('id_rol').eq('id_usuario',user.id);
            console.log(data[0].id_rol );
            setData(data[0].id_rol); 
        }
        if(user) loadData()
    },[user])
    /* const [user,setUser] = useState(null);
    const router = useRouter();
    useEffect(()=>{
        const {data,error} = supabase.auth.getUser();
        
        if(error){
            throw error;
        }
        console.log({data,error});    
        if (data==null){
            router.push('/login');
        }
    },[]); */
    return (
        <div>
            <Menu userRole={data}></Menu>
            {/* {Object.entries(user).map((e)=><div>{e}</div>)}*/}
            
        </div>
        
        );
    }
    
