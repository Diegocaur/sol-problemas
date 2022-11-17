import Menu from './components/menu.js';
import Usuario from './components/tablausuarios.js';
import {supabase} from './api/index.js';
import {useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState,useEffect} from 'react';

export default function administracion_usuarios() {

    const supabase = useSupabaseClient();
  
    return (
    <div>
        <Usuario/>
    </div>
    )
  }

  

