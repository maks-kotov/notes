import { useEffect, useState } from 'react'
import './App.css'
import Notes from './components/Notes/notes.tsx'
import { supabase } from './lib/supabase.ts'
import type { Session } from '@supabase/supabase-js'
import Auth from './components/Auth/auth.tsx'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(()=> {
    //1. при запуске устанавливем значение session
    supabase.auth.getSession().then(({data: { session }})=> {
      setSession(session)
    })
    //2. вешаем обработчик события который срабатывает когда меняется сессия (вышли из аккаунта, отчистили кэш) 
    const { data: {subscription}  } = supabase.auth.onAuthStateChange((event,sesion)=>{
      setSession(sesion)
    })
    //3. если закрыть страницу - обработчик перестаёт следить за состоянием сессии. 
    return ()=> subscription.unsubscribe();
  },[session])


  return (
      <>
        {!session ? <Auth /> : <Notes />}
      </>
  )
}

export default App
