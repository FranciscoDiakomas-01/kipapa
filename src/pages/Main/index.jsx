import './index.css'
import pizza from '../../assets/pngegg (9).png'
import hambuger from '../../assets/pngegg (1).png'
import image from '../../assets/bugger.jpg'
import { FaArrowLeft, FaArrowRight, FaPaperPlane, FaShoppingCart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import bg2 from '../../assets/464745397_18022215284605621_2273606827089846785_n.jpg'
import { getAllCategory } from "../../services/CategoryProduct.js";
import { useState, useEffect } from 'react'
import AOS from 'aos'
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
        AOS.init({
          duration: 1000, // Duração da animação em milissegundos
          easing: "ease-in-out", // Função de timing
          offset: 80, // Deslocamento em pixels

        });
        AOS.refresh();
        
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
            <img
              src={banners[Active].cover}
              loading="lazy"
              data-aos="zoom-in"
            />
          </aside>
        </article>
        <article>
          <img
            data-aos="zoom-in-down"
            src={banners[Active].cover}
            loading="lazy"
          />
          <aside>
            <h1 data-aos="fade-down"> Está sem tempo para cozinhar? </h1>
            <p data-aos="fade-right">
              Quer experimentar novos sabores? Conte com a gente! Oferecemos uma
              variedade de produtos deliciosos, preparados com ingredientes
              frescos e de alta qualidade. Nosso compromisso é entregar seu
              pedido no menor tempo possível, sem abrir mão da qualidade. Além
              disso, contamos com um atendimento personalizado e diversas formas
              de pagamento para facilitar a sua vida. Faça seu pedido agora
              mesmo pelo nosso site ou aplicativo e aproveite nossas promoções
              exclusivas!
            </p>
            <button
              data-aos="fade-up"
              onClick={() => {
                navigate("/product");
              }}
            >
              <p>Faça já o seu pedido</p>
              <FaPaperPlane />
            </button>
          </aside>
        </article>
        <article>
          {Array.isArray(categorys) &&
            categorys?.length > 0 &&
            categorys.map((ct, index) => (
              <div key={index}>
                <img src={ct.img_url} loading="lazy" />
                <p>{ct.title}</p>
              </div>
            ))}
        </article>
      </section>
    );
}