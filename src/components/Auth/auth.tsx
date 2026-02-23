import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./auth.module.css";
import Spinner from "./spinner/spinner";
import gitHubIcon from "../../assets/icons/github.png";
import googleIcon from "../../assets/icons/google.png";
function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage("Подвердите вашу электронную почту.");
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid login credentials")) {
          setMessage("Неверный email или пароль");
        } else if (error.message.includes("email not confirmed")) {
          setMessage("Подтвердите ваш email");
        } else if (error.message.includes("user already registered")) {
          setMessage("Пользователь с таким email уже существует");
        } else if (error.message.includes("password should be at least")) {
          setMessage("Пароль должен быть не менее 6 символов");
        } else if (error.message.includes("too many requests")) {
          setMessage("Слишком много попыток. Попробуйте позже");
        } else if (
          error.message.includes("Password should be at least 6 characters.")
        ) {
          setMessage("В пароле должно быть не менее 6 символов");
        } else {
          setMessage("какая-то ошибка(");
        }
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>{isLogin ? "Вход" : "Регистрация"}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? (
              <div className={styles.loadingStatus}>
                <span>Загрузка...</span>
                <Spinner />
              </div>
            ) : isLogin ? (
              "Войти"
            ) : (
              "Зарегистрироваться"
            )}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}

        <button
          className={styles.hasAccount}
          onClick={() => {
            setIsLogin(!isLogin);
            setEmail("");
            setPassword("");
          }}>
          {isLogin ? (
            <>
              <span className={styles.hasAccount}>Нет аккаунта? </span>
              <span className={styles.makeAction}>Зарегистрироваться</span>
            </>
          ) : (
            <>
              <span className={styles.hasAccount}>Есть аккаунт? </span>
              <span className={styles.makeAction}>Войти</span>
            </>
          )}
        </button>

        <div className={styles.socialButtons}>
          <button
            className={styles.socialLogin}
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                  queryParams: { prompt: "consent" },
                },
              })
            }>
            <img src={googleIcon} alt="google" className={styles.socialImg} />
            <span className={styles.socialText}>Войти через Google</span>
          </button>
          <button
            className={styles.socialLogin}
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "github",
                options: { queryParams: { prompt: "consent" } },
              })
            }>
            <img src={gitHubIcon} alt="github" className={styles.socialImg} />
            <span className={styles.socialText}>Войти через GitHub</span>
          </button>
        </div>
      </div>
    </>
  );
}
export default Auth;
