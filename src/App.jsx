/* eslint-disable no-unused-vars */
import "./App.css";
import Header from "./components/header";
import logo from "./assets/321097281_1948082938901845_9073110493333833804_n.jpg";
import { FaFacebook , FaWhatsapp , FaInstagram, FaGithub} from "react-icons/fa";
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
    link: "https://www.facebook.com/profile.php?id=61560288840032",
  },
  {
    id: 2,
    icon: <FaWhatsapp />,
    link: "http://faebook.com",
  },
  {
    id: 3,
    icon: <FaGithub />,
    link: "https://github.com/FranciscoDiakomas-01/",
  },
  {
    id: 4,
    icon: <FaWhatsapp />,
    link: "http://faebook.com",
  },
];
export function App() {
  const [payForms, setPayForms] = useState()
  useEffect(() => {
    
    sessionStorage.setItem("ctId", "all");
    sessionStorage.getItem("ctitle" , "");
    async function get() {
      const result = await getAllPayForm()
      setPayForms(prev => result?.data)
    }
    get()
  },[])
  return (
    <main id="app">
      <Header />
      <ToastContainer style={{
        zIndex: '999999999999999999999999999'
      }}/>
      <section>
        <Outlet />
      </section>
      <footer>
        <div>
          <span>
            <img src={logo} />
            <h1>Kipapa</h1>
          </span>
          <span>
            {socialmedia.map((social, index) => (
              <Link key={index} to={social.link} target="_blank">
                {social.icon}
              </Link>
            ))}
          </span>
        </div>
        <p>Francisco Diakomas &copy; | Todos dos Direitos Reservados</p>
      </footer>
    </main>
  );
}
