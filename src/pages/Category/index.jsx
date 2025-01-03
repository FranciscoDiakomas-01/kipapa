import "./index.css";
import Loader from "../../components/loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../services/CategoryProduct.js";
export default function Category() {
  const nav = useNavigate();
  const [isloading, setIsloading] = useState(true);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    async function get() {
      const result = await getAllCategory(1, 0);
      setCategorys(result?.data);
    }
    get();
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }, []);
  return (
    <section id="category">
      <article>
        <h1 data-aos="slide-down">Categorias</h1>
      </article>
      {isloading ? (
        <Loader />
      ) : (
        <article>
          {
            categorys?.length === 0 && (
              <h2 data-aos="fade-up">Nenhuma categoria encontrada</h2>
            ) 
          }
          <aside>
            {categorys?.map((ct) => (
              <figure key={ct?.id} data-aos="flip-left">
                <span>
                  <img src={ct.img_url} loading="lazy" />
                  <strong>{ct.title}</strong>
                </span>
                <div>
                  <p>{ct.description}</p>
                  <button
                    onClick={() => {
                      nav("/product");
                      sessionStorage.setItem("ctId", ct?.id);
                      sessionStorage.setItem("ctitle", ct?.title);
                      window.scrollTo({
                        behavior: "smooth",
                        left: 0,
                        top: -150,
                      });
                    }}
                  >
                    Ver produtos
                  </button>
                </div>
              </figure>
            ))}
          </aside>
        </article>
      )}
    </section>
  );
}
