import { Link } from "react-router-dom";
import logo from '../../assets/321097281_1948082938901845_9073110493333833804_n.jpg'
import { FaUser  , FaShoppingCart} from "react-icons/fa";
import './index.css'
import Card from "../Card";
import { useEffect , useState } from "react";
import { getTotalProduct } from "../../services/card";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const nav = useNavigate()
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
    },
    {
      path: "/contact",
      name: "Contacto",
    },
  ];
return (
  <header id="header">
    <Card />
    <nav>
      <div>
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
        <FaUser onClick={() => {
          nav('acount')
        }}/>
        <FaShoppingCart
          onClick={() => {
            const card = document.getElementById("card");
            card.classList.toggle("open");
          }}
        />
        <sup>
          {total}
        </sup>
        <button>sair</button>
      </div>
    </nav>
  </header>
);
}