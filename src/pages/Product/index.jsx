/* eslint-disable no-unused-vars */
import './index.css'
import { useState, useEffect } from 'react';
import image from '../../assets/pngegg (9).png'
import { FaShoppingCart , FaSearch} from 'react-icons/fa';
import Loader from '../../components/loader';
import { addProduct } from '../../services/card';
import { toast } from 'react-toastify';
import { getAllProduct } from '../../services/product';
export default function Product() {
  const [product, setProduct] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [categorys, setCategorys] = useState([])
  const [page, setPage] = useState(1)
  const [lasPage , setLaspage] = useState()
  useEffect(() => {
      async function get() {
        const response = await getAllProduct(page, 10)
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
    },[page])
    return (
      <section id="product">
        <div>
          <h1>Produtos</h1>
        </div>
        {isloading ? (
          <Loader />
        ) : (
          <>
            <form>
              <button>
                <FaSearch />
              </button>
              <select id="filter" title="filter">
                <option>Selecione uma categoria</option>
                {categorys.map((ct) => (
                  <option key={ct.id} value={ct.title}>
                    {ct.title}
                  </option>
                ))}
              </select>
            </form>
            <h2>Produtos disponíveis</h2>
            <aside>
              {product.map((prod) => (
                <figure key={prod.id}>
                  <div>
                    <img src={prod.img_url} loading="lazy" />
                  </div>
                  <figcaption>
                    <h3>{prod.name}</h3>
                    <div>
                      <strong>
                        {Number(prod.current_price).toLocaleString("pt")}kz
                      </strong>
                      {prod.old_price != 0  && (
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
              <button onClick={() => {
                if (lasPage > page) {
                  setPage((prev) => prev + 1);
                  return;
                } else {
                  toast("Limite")
                  return
                }
                
            }}>Ver Mais</button>
          </>
        )}
      </section>
    );
}