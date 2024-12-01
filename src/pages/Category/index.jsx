import './index.css'
import Loader from '../../components/loader';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategory} from '../../services/CategoryProduct'
export default function Category() {
    const nav = useNavigate()
    const [isloading, setIsloading] = useState(true);
    const [categorys, setCategorys] = useState([]);
    useEffect(() => {
      async function get() {
        const result = await getAllCategory(1, 0)
        setCategorys(result?.data)
      }
     get()
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
                    <img src={ct.img_url} loading="lazy" />
                    <strong>{ct.title}</strong>
                  </span>
                  <div>
                    <p>{ct.description}</p>
                    <button onClick={() => {
                      nav("/product")
                      sessionStorage.setItem('ctId', ct?.id)
                      sessionStorage.setItem('ctitle', ct?.title)
                      window.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top:- 150
                      })
                    }}>Ver produtos</button>
                  </div>
                </figure>
              ))}
            </aside>
          </article>
        )}
      </section>
    );
}