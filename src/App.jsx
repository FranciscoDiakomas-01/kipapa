/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./components/header";
import logo from "./assets/321097281_1948082938901845_9073110493333833804_n.jpg";
import { FaFacebook , FaWhatsapp , FaInstagram } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import 'react-toastify/ReactToastify.css'
import { getAllPayForm } from "./services/pay";
const socialmedia = [
  {
    id: 1,
    icon: <FaFacebook />,
    link: "http://faebook.com",
  },
  {
    id: 2,
    icon: <FaWhatsapp />,
    link: "http://faebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    link: "http://faebook.com",
  },
];
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
  },
  {
    path: "/contact",
    name: "Contacto",
  },
];
export function App() {
  const [payForms, setPayForms] = useState()
  useEffect(() => {
    async function get() {
      const result = await getAllPayForm()
      setPayForms(prev => result?.data)
    }
    get()
  },[])
  return (
    <main id="app">
      <Header />
      <ToastContainer />
      <section>
        <Outlet />
      </section>
      <footer>
        <div>
          <span>
            <img src={logo} />
            <h1>Kipapa</h1>
          </span>
          <p>Entre em contacto com o kipapa em qualquer rede social!</p>
          <span>
            {socialmedia.map((social, index) => (
              <Link key={index} to={social.link} target="_blank">
                {social.icon}
              </Link>
            ))}
          </span>
        </div>
        <div>
          <h1>Formas de Pagamento</h1>
          <ol>
            {payForms?.length > 0 &&
              payForms.map((pay, index) => (
                <li key={index}>{String(pay.title).toLocaleLowerCase()}</li>
              ))}
          </ol>
        </div>
        <div>
          <h1>Links Rápidos</h1>
          <ol>
            {links.map((link, index) => (
              <Link key={index} to={link.path} target="_self">
                {link.name}
              </Link>
            ))}
          </ol>
        </div>
        <div>
          <h1>Horário</h1>
          <p>Estamos Abertos Todos dias das 08h às 22hr</p>
          <button>
            {new Date().getHours() < 8 || new Date().getHours() > 22
              ? "Estamos Fechado"
              : "Estamos Aberto"}
          </button>
        </div>
        <p>Kipapa&copy; | Todos dos Direitos Reservados</p>
      </footer>
    </main>
  );
}
