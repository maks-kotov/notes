import "./App.css";
import Notes from "./components/Notes/notes.tsx";
import Auth from "./components/Auth/auth.tsx";
import { useAuth } from "./contexts/authContext.tsx";
import BigSpinnerCenter from "./assets/bigSpinnerCenter/bigSpinnerCenter.tsx";

function App() {
  // const [session, setSession] = useState<Session | null>(null)
  const { session, signInIsLoading } = useAuth(); // когда session меняется внутри AuthContext.Provider - тут происходит перерисовка

  return (
    <>
      {
        // если загрузка - показываем загрузку. если нет - то форму или заметки, взависимости от session
        signInIsLoading ? <BigSpinnerCenter /> : !session ? <Auth /> : <Notes />
      }
    </>
  );
}

export default App;
