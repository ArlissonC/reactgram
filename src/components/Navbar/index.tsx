import "./Navbar.css";

// Components
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import React, { useState } from "react";
import useAuth from "hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store/configureStore";
import { logout } from "store/ducks/auth";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={({ target }) => setQuery(target.value)}
        />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li onClick={() => dispatch(logout())}>
              <span>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
