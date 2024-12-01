import { Link } from "react-router-dom";
import logo from "../../assets/321097281_1948082938901845_9073110493333833804_n.jpg";
import { FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import "./index.css";
import Card from "../Card";
import { useEffect, useState } from "react";
import { getTotalProduct } from "../../services/card";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const [total, setTotal] = useState(getTotalProduct());
  useEffect(() => {
    setInterval(() => {
      setTotal(getTotalProduct());
    }, 1000);
  }, [total]);
  const links = [
    {
      path: "/",
      name: "Inicial",
    },
    {
      path: "/product",
      name: "Menu",
    },
    {
      path: "/category",
      name: "Categorias",
    }
  ];
  return (
    <header id="header">
      <Card />
      <nav>
        <div
          onClick={() => {
            nav("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} />
          <h1>Kipapa</h1>
        </div>
        <ol>
          {links.map((link) => (
            <Link key={link.name} to={link.path}>
              {link.name}
            </Link>
          ))}
        </ol>
        <div>
          {localStorage.getItem("token") && (
            <FaUser
              onClick={() => {
                nav("acount");
              }}
            />
          )}
          <FaShoppingCart
            onClick={() => {
              const card = document.getElementById("card");
              card.classList.toggle("open");
            }}
          />
          <sup>{total}</sup>
          <button
            onClick={(e) => {
              if (e.target.textContent == "Sair") {
                localStorage.clear()
                sessionStorage.clear()
              }
              nav("/login");
            }}
          >
            {localStorage.getItem("token") ? "Sair" : "Entrar"}
          </button>
          <FaBars
            onClick={() => {
              const leftBar = document.getElementById("leftBar");
              leftBar.classList.toggle("open");
            }}
          />
        </div>
      </nav>

      <div
        id="leftBar"
        onClick={() => {
          const leftBar = document.getElementById("leftBar");
          leftBar.classList.toggle("open");
        }}
      >
        {links.map((link) => (
          <Link key={link.name} to={link.path}>
            {link.name}
          </Link>
        ))}
        <button
          onClick={() => {
            nav("/login");
          }}
        >
          {localStorage.getItem("token") ? "Sair" : "Entrar"}
        </button>
      </div>
    </header>
  );
}
