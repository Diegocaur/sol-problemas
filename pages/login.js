import {useState,useEffect} from 'react';
//import {supabase} from './api/index.js';
import {useRouter} from 'next/router';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
export default function LogIn(){
    const session = useSession();
    const supabase = useSupabaseClient();
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const router = useRouter();
    const handleLogin=async (event)=>{
        event.preventDefault();
        try{
            let { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
              });
            if(error) throw error
        }catch(error){
            alert(error.error_description||error.message)
        }
    }
    return (
        <form onSubmit={handleLogin}>
            <label>Correo: </label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label>Contraseña: </label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit'>Entrar</button>
        </form>
    );
}