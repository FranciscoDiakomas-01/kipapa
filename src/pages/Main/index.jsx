import './index.css'
import pizza from '../../assets/pngegg (9).png'
import hambuger from '../../assets/pngegg (1).png'
import image from '../../assets/bugger.jpg'
import { FaArrowLeft, FaArrowRight, FaShoppingCart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import bg2 from '../../assets/464745397_18022215284605621_2273606827089846785_n.jpg'
import { getAllCategory } from "../../services/CategoryProduct";
import { useState, useEffect } from 'react'
export default function Main() {
      const navigate = useNavigate()
      const [Active , setActive] = useState(0)
      const banners = [
          {
              text: "O SABOR DE VERDADE É NO KIPAPA",
              cover: pizza,
              slogan: "Delicie a sua vida no Kipapa",
              bg: image,
              
          },
          {
              text: "DELICIE A SUA VIDA SEMPRE NO KIPAPA",
              cover: hambuger,
              slogan: "Kipapa prioriza a sua satisfação",
              bg: bg2,
          },
      ];
      const [categorys, setCategorys] = useState([]);
      useEffect(() => {
        async function get() {
          const respose = await getAllCategory(1, 0)
          setCategorys(respose?.data)
      }
      get()
      }, []);
    return (
      <section id="main">
        <article
          style={{
            backgroundImage: `linear-gradient(#000000b8 , #000000b8) , url(${banners[Active].bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <button
            onClick={() => {
              if (Active > 0) {
                setActive((prev) => prev - 1);
              } else {
                setActive(banners.length - 1);
              }
            }}
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => {
              if (Active >= banners.length - 1) {
                setActive(0);
              } else {
                setActive((prev) => prev + 1);
              }
            }}
          >
            <FaArrowRight />
          </button>
          <aside>
            <span>{banners[Active].slogan}</span>
            <h1>{banners[Active].text}</h1>
            <button
              onClick={() => {
                navigate("/product");
              }}
            >
              <FaShoppingCart />
              <p>Compre já!</p>
            </button>
          </aside>
          <aside>
            <img src={banners[Active].cover} loading="lazy" />
          </aside>
        </article>
        <article>
          <img src={banners[Active].cover} loading="lazy" />
          <aside>
            <h1>Sobre Nós</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing
              elit.Aliquid,illo? Vel cum impedit perspiciatis enim,
              dignissimosblanditiisdolorum, dolor velit quaerat unde
              magnamexercitationem.Architecto eius ipsa consectetur
              minimaimpedit.Lorem ipsum dolor sit amet consectetur adipisicing
              eli Vel cum impedit perspiciatis enim,
              dignissimosblanditiisdolorum, dolor velit quaerat unde
              magnamexercitationem.Architecto eius ipsa consectetur
              minimaimpedit.Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
            </p>
            <button>Leia mais</button>
          </aside>
        </article>
        <article>
          {Array.isArray(categorys) && categorys?.length > 0 && categorys.map((ct, index) => (
            <div key={index}>
              <img src={ct.img_url} loading="lazy" />
              <p>{ct.title}</p>
            </div>
          ))}
        </article>
      </section>
    );
}