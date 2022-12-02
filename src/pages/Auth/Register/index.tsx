import "../Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "components/Message";

// Hooks
import { useState, useEffect } from "react";
import { RootState, useAppDispatch } from "store/configureStore";
import { useSelector } from "react-redux";
import { register, reset } from "store/ducks/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={({ target }) => setName(target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={({ target }) => setEmail(target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={({ target }) => setConfirmPassword(target.value)}
          value={confirmPassword}
        />
        {!loading ? (
          <input type="submit" value="Cadastrar" />
        ) : (
          <input type="submit" disabled value="Carregando..." />
        )}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
