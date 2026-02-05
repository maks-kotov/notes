import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

const AuthContext = createContext<{
  session: Session | null,
  signInIsLoading: boolean,
  signOut: null | (()=>void),
  signOutIsLoading: boolean 
}>({
  session: null,
  signInIsLoading: true,
  signOut: null,
  signOutIsLoading: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) { // потом разберёмся как тут параметры работают
  const [session, setSession] = useState<Session | null>(null);
  const [signInIsLoading, setSignInIsLoading] = useState(true);
  const [signOutIsLoading, setSignOutIsLoading] = useState(false);
  const prevUserIdRef = useRef<string | null>(null); // для избежания перерендера на alt + tab
  const signOut = async () => {
    try {
      setSignOutIsLoading(true)
      const { error } = await supabase.auth.signOut()
      window.location.href = '/'
      if (error) {
        console.error('Ошибка при выходе: ', error.message)
      }
    } catch (error) {
      console.log('ошибка при выходе: ', error);
      window.location.href = '/'
    } finally {
      setSignOutIsLoading(false)
    }
  }
  useEffect(() => {
    // Получаем начальную сессию
    //не async await потму что это оч сильно усложнит
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSignInIsLoading(false);
      console.log('get');
    });
    // Слушаем изменения
    const {data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_IN' && session?.user.id === prevUserIdRef.current) {
        return; // для избежания перерендера на alt + tab
      }
      if (session?.user.id !== undefined) {
        // console.log('игнор если сессия повторная');
        prevUserIdRef.current = session.user.id;
      }
      if(_event !== 'INITIAL_SESSION') { //hz
        setSession(session);
        setSignInIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, signInIsLoading, signOut, signOutIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

/* 
порядок выполнения:
1. supabase.auth.onAuthStateChange (выполняется быстрее, тк запросы к бд асинхронны)
2. supabase.auth.getSession() (выполнился, сменился session)
3. supabase.auth.onAuthStateChange  (сработал на изменение (лишний ращз))

когда сессия уже определена - событие на onAuthStateChange (состояние сессии) выглядит как initial_session. и я написал что если сессия уже определена (getSession.then сработал), то мы ничего не делаем
(просто -1о лишнее действие)
*/
