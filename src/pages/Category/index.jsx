import './index.css'
import Loader from '../../components/loader';
import { useState, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';
import image from '../../assets/pngegg (14).png'
export default function Category() {
    const [isloading, setIsloading] = useState(true);
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
      setCategorys([
        {
          title: "Hambuguer",
          description: "Hambuguer de Frango com molho picante",
          total: 1100,
          id: crypto.randomUUID(),
          image_url: image,
        },
        {
          title: "Hambuguer",
          description: "Hambuguer de Frango com molho picante",
          total: 3150,
          id: crypto.randomUUID(),
          image_url: image,
        },
        {
          title: "Hambuguer",
          description: "Hambuguer de Frango com molho picante",
          total: 4000,
          id: crypto.randomUUID(),
          image_url: image,
        },
        {
          title: "Hambuguer",
          description: "Hambuguer de Frango com molho picante",
          total: 40002,
          id: crypto.randomUUID(),
          image_url: image,
        },
        {
          title: "Hambuguer",
          description: "Hambuguer de Frango com molho picante",
          total: 6200,
          id: crypto.randomUUID(),
          image_url: image,
        },
      ]);
      setTimeout(() => {
        setIsloading(false);
      }, 2000);
    }, []);
    return (
      <section id="category">
        <article>
          <h1>Categorias</h1>
        </article>
        {isloading ? (
          <Loader />
        ) : (
          <article>
            <h2>Categorias Disponíveis</h2>
            <aside>
              {categorys.map((ct) => (
                <figure key={ct?.id}>
                  <span>
                    <img src={ct.image_url} loading="lazy" />
                    <strong>{ct.title}</strong>

                    <i>
                      <FaRegStar />
                      {ct.total} Produtos
                    </i>
                  </span>
                  <div>
                    <p>{ct.description}</p>
                    <button>Ver produtos</button>
                  </div>
                </figure>
              ))}
            </aside>
          </article>
        )}
      </section>
    );
}