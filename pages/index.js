import {useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from './account';
import LogIn from './login';
export default function Home() {

  /*const supabase = useSupabaseClient();*/
  const user = useUser()

  return (
    <div>
    {!user? <LogIn/>
      :<Account user ={user}/>}
    </div>
  )
}
