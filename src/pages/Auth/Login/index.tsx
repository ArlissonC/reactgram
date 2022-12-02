import "../Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "components/Message";

// Hooks
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Redux
import { RootState, useAppDispatch } from "store/configureStore";
import { login, reset } from "store/ducks/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça login para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {!loading ? (
          <input type="submit" value="Entrar" />
        ) : (
          <input type="submit" disabled value="Carregando..." />
        )}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;
