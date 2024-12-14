import './index.css'
import pizza from '../../assets/pngegg (9).png'
import image from '../../assets/bugger.jpg'
import {  FaPaperPlane, FaShoppingCart} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getAllCategory } from "../../services/CategoryProduct.js";
import chef from '../../assets/chef1.png'
import { useState, useEffect } from 'react'
import AOS from 'aos'
import svg1 from '../../assets/undraw_delivery_address_re_cjca.svg'
import svg2 from "../../assets/undraw_on_the_way_re_swjt.svg";
import svg3 from "../../assets/undraw_online_groceries_a02y.svg";
export default function Main() {
      const navigate = useNavigate()
      const banners = {
              text: "O SABOR DE VERDADE É NO KIPAPA",
              cover: pizza,
              slogan: "Delicie a sua vida no Kipapa",
              bg: image,
              
      }
      const howWork = [
        {
          id: 1,
          title: "Faça o Pedido",
          description:
            "Faça o seu pedido na nossa plataforma e desfrute da variedade de produto que oferecemos para si..",
          icon: svg3,
        },
        {
          id: 2,
          title: "Localização",
          description:
            "Informe nos a sua localização ou permita que obtenhamos a sua localização de forma automática.",
          icon: svg1,
        },
        {
          id: 3,
          title: "Entrega",
          description:
            "Monitore o estado da sua compra em tempo real para saber tudo sobre a mesma.",
          icon: svg2,
        },
      ];
      const [categorys, setCategorys] = useState([]);
      useEffect(() => {
        AOS.init({
          duration: 1000, // Duração da animação em milissegundos
          easing: "ease-in-out", // Função de timing
          offset: 100, // Deslocamento em pixels

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
            backgroundImage: `linear-gradient(#000000b8 , #000000b8) , url(${banners.bg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <aside>
            <span>{banners.slogan}</span>
            <h1>{banners.text}</h1>
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
            <img src={banners.cover} loading="lazy" data-aos="zoom-in" />
          </aside>
        </article>
        <article>
          <img data-aos="zoom-in-down" src={chef} loading="lazy" />
          <aside>
            <h1 data-aos="fade-down"> Está sem tempo para cozinhar? </h1>
            <p data-aos="fade-right">
              Quer experimentar novos sabores? Conte com a gente! Oferecemos uma
              variedade de produtos deliciosos, preparados com ingredientes
              frescos e de alta qualidade. Nosso compromisso é entregar seu
              pedido no menor tempo possível, sem abrir mão da qualidade. Além
              disso, contamos com um atendimento personalizado e diversas formas
              de pagamento para facilitar a sua vida. Faça seu pedido agora
              mesmo pelo nosso site e aproveite nossas promoções exclusivas!
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

        <article>
          <h1>Como Fazer Um Pedido</h1>
          <div>
            {howWork.map((data) => (
              <figure key={data.id} data-aos="flip-right">
                <img src={data.icon} />
                <h2>{data.title}</h2>
                <p>{data.description}</p>
              </figure>
            ))}
          </div>
        </article>
      </section>
    );
}