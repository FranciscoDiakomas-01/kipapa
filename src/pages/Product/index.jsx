/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './index.css'
import { useState, useEffect } from 'react';
import { FaShoppingCart , FaSearch , FaCircle} from 'react-icons/fa';
import Loader from '../../components/loader';
import { addProduct } from '../../services/card';
import { toast } from 'react-toastify';
import { getAllProduct, getAllProductByCategory } from '../../services/Product.js';
import AOS from 'aos'
import { getAllCategory } from '../../services/CategoryProduct.js';
export default function Product() {

  
  const [product, setProduct] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [categorys, setCategorys] = useState([])
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState(sessionStorage.getItem("ctId"));
  const [reaload, setReload] = useState(false)
  const [total , setTotal] = useState()
  const [lasPage, setLaspage] = useState()
  const [selectActegory, setSelectCategory] = useState(sessionStorage.getItem("ctitle"))
  useEffect(() => {
    
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      offset: 200,
      
    });
    AOS.refresh();
    async function get() {
      const respose1 = await getAllCategory(1, 0)
      setCategorys(prev => respose1?.data)
          setIsloading(true);
        if (filter != "all") {
          //getbyCategory
          const response = await getAllProductByCategory(page, 10, filter)
          setTotal(response?.total)
          if (page != 1) {
            const newList = [...product];
            response?.data?.forEach((pr) => {
              newList.push(pr);
            });
            setProduct((prev) => newList);
            setLaspage((prev) => response?.latPage);
            return;
          }
          setProduct(prev => response?.data)
          setLaspage((prev) => response?.latPage);
          return
        }
        const response = await getAllProduct(page, 10)
          setTotal(response?.total);
        if (page != 1) {
          const newList = [...product]
          response?.data?.forEach(pr => {
            newList.push(pr)
          });
          setProduct((prev) => newList);
          setLaspage((prev) => response?.latPage);
          return
        }
        setProduct(prev => response?.data)
        setLaspage((prev) => response?.latPage);
      }
      get()
      setTimeout(() => {
        setIsloading(false)
      }, 2000)
    return () => {
      sessionStorage.setItem("ctId","all");
      sessionStorage.setItem("ctitle","");
      }
    },[page , reaload, filter])
    return (
      <section id="product">
        <div>
          <h1 data-aos="slide-down">Produtos</h1>
        </div>
        {isloading ? (
          <Loader />
        ) : (
          <>
            <form>
              <button>
                <FaSearch />
              </button>
              <select
                id="filter"
                title="filter"
                onChange={(e) => {
                  setPage((prev) => 1);
                  setSelectCategory(
                    (prev) => e.target[e.target.selectedIndex].text
                  );
                  setFilter((prev) => e.target.value);
                }}
              >
                <option value={"all"}>Selecione uma categoria</option>
                <option value={"all"}>Todas as categorias</option>
                { categorys?.length > 0 &&  categorys?.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.title}
                  </option>
                ))}
              </select>
            </form>
            {filter == "all" ? (
              <h2>Produtos disponíveis </h2>
            ) : (
              <h2>
                Resultados de {selectActegory} {total}{" "}
              </h2>
            )}
            <aside>
              {product?.length > 0 &&
                product?.map((prod) => (
                  <figure key={prod.id} data-aos="flip-left">
                    <div>
                      <img src={prod.img_url} loading="lazy" />
                    </div>
                    <figcaption>
                      <h3>{prod.name}</h3>
                      <p
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <FaCircle
                          style={{
                            color: "var(--blue)",
                          }}
                        />
                        <i>{prod?.title}</i>
                      </p>
                      <div>
                        <strong>
                          {Number(prod.current_price).toLocaleString("pt")}kz
                        </strong>
                        {prod.old_price != 0 && (
                          <del>
                            {Number(prod.old_price).toLocaleString("pt")}
                            kz
                          </del>
                        )}
                      </div>
                      <div>
                        <p>
                          <strong>Descrição: </strong>
                          {prod.description?.toString().slice(0, 50)}
                        </p>
                      </div>
                    </figcaption>
                    <aside>
                      <button
                        onClick={() => {
                          const pr = {
                            name: prod.name,
                            price: prod.current_price,
                            image_url: prod.img_url,
                            id: prod.id,
                          };
                          addProduct(pr);
                          toast.success("Produto Adicionado!");
                        }}
                      >
                        <FaShoppingCart />
                      </button>
                    </aside>
                  </figure>
                ))}
            </aside>
            <button
              onClick={() => {
                if (lasPage > page) {
                  setPage((prev) => prev + 1);
                  return;
                } else {
                  toast("Limite");
                  return;
                }
              }}
            >
              Ver Mais
            </button>
          </>
        )}
      </section>
    );
}