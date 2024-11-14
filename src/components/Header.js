import React, { useContext, useEffect, useState } from "react";
import logoUs from "../images/header_title.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const history = useNavigate();

  useEffect(() => {
    handleEmail();
  }, []);

  function handleLogout() {
    props.onSignOut();
  }
  function redirect() {
    history("/signin");
  }

  async function handleEmail() {
    auth
      .checkToken(props.token)
      .then((res) => {
        res.json();
      })
      .then((data) => {
        if (data) {
          console.log("header email???  ", data);
          setEmail(data.email);
        }
      });
  }
  return (
    <header className="header">
      <img
        src={logoUs}
        className="header__image"
        id="header_title"
        alt="Que bonito logo que dice alrededor de U S"
      />
      {props.loggedIn ? <p>{email}</p> : ""}
      {props.loggedIn ? (
        <p className="header__text" onClick={handleLogout}>
          Cerrar sesion
        </p>
      ) : (
        <p className="header__text" onClick={redirect}>
          Iniciar sesion
        </p>
      )}
    </header>
  );
}
