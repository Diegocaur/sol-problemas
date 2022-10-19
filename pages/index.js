import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Auth,ThemeSupa} from '@supabase/auth-ui-react';
import { useSession,useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useState,useEffect} from 'react';
import Account from './account';
import LogIn from './login';
export default function Home() {
  const supabase = useSupabaseClient();
  const user = useUser()
  return (
    <div>
    {!user? <LogIn/>
      :<Account user ={user}/>}
  </div>
  )
}
