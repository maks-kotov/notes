import { useState } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./auth.module.css"
function Auth() {
    const [email, setEmail] = useState('');      // Храним введённый email
    const [password, setPassword] = useState(''); // Храним введённый пароль
    const [isLogin, setIsLogin] = useState(true); // Режим: вход или регистрация?
    const [loading, setLoading] = useState(false); // Идёт загрузка?
    const [message, setMessage] = useState('');   // Сообщения об ошибках/успехе
    
    function handleSubmit() {
        
    }
    return (
        <>
         <div className={styles.container}>
    {/* Заголовок меняется в зависимости от режима */}
    <h2 className={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
    
    {/* Форма отправляет данные в handleSubmit */}
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Поле для email */}
      <input
        type="email"
        placeholder="Email"
        value={email}                 // Что отображать
        onChange={(e) => setEmail(e.target.value)} // Меняем состояние при вводе
        required                      // Обязательное поле
        className={styles.input}
      />
      
      {/* Аналогично для пароля */}
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.input}
      />
      
      {/* Кнопка меняет текст в зависимости от состояния */}
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
      </button>
    </form>
    
    {/* Показываем сообщения (ошибки или подтверждение) */}
    {message && <p className="message">{message}</p>}
    
    {/* Кнопка переключения между входом и регистрацией */}
    <button className={styles.hasAccount} onClick={() => setIsLogin(!isLogin)}>
      {isLogin ? 
      <>
      <span className={styles.hasAccount}>Нет аккаунта? </span>
      <span className={styles.makeAction}>Зарегистрироваться</span>
      </>  
      :
      <>
      <span className={styles.hasAccount}>Есть аккаунт? </span>
      <span className={styles.makeAction}>Войти</span>
      </>  }
    </button>

    {/* Кнопки входа через социальные сети */}
    <div className={styles.socialButtons}>
      <button className={styles.socialLogin} onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}>
        <img src="src/assets/icons/google.png" alt="google" className={styles.socialImg}/>
        <span className={styles.socialText}>Войти через Google</span>
      </button>
      <button className={styles.socialLogin} onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}>
        <img src="src/assets/icons/github.png" alt="github" className={styles.socialImg}/>
        <span className={styles.socialText}>Войти через GitHub</span>
      </button>
    </div>
  </div>
        </>
    )
}
export default Auth