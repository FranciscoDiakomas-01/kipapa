/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./index.css";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaCircle } from "react-icons/fa";
import Loader from "../../components/loader";
import { addProduct } from "../../services/card";
import { toast } from "react-toastify";
import { getAllProduct, getAllProductByCategory} from "../../services/Product.js";
import { getAllCategory } from "../../services/CategoryProduct.js";
export default function Product() {
  const [product, setProduct] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [categorys, setCategorys] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(sessionStorage.getItem("ctId"));
  const [lasPage, setLaspage] = useState();
  const [selectActegory, setSelectCategory] = useState(
    sessionStorage.getItem("ctitle")
  );
  useEffect(() => {
    async function getCategorys() {
      const respose1 = await getAllCategory(1, 0);
      setCategorys((prev) => respose1?.data);
      return;
    }
    async function get() {
      setIsloading(true);
      if (filter == "all" && page == 1) {
        const response = await getAllProduct(page, 10);
        setProduct((prev) => response?.data);
        setLaspage((prev) => response?.latPage);
        setTimeout(() => {
          setIsloading(false);
        }, 2000);
        return;
      }
      if (page > 1 && filter == "all") {
        const response = await getAllProduct(page, 10);
        const newList = new Array(...product).concat(response?.data);
        setProduct((prev) => newList);
        setLaspage((prev) => response?.latPage);
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
        return;
      }
      if (filter != "all") {
        if (page == 1) {
          setProduct((prev) => []);
        }
        const response = await getAllProductByCategory(page, 10, filter);
        if (page > 1) {
          const newList = new Array(...product).concat(response?.data);
          setProduct((prev) => newList);
          setLaspage((prev) => response?.latPage);
          setTimeout(() => {
            setIsloading(false);
          }, 1000);
          return;
        }
        setProduct((prev) => response?.data);
        setLaspage((prev) => response?.latPage);
        setTimeout(() => {
          setIsloading(false);
        }, 2000);
        return;
      }
    }
    getCategorys();
    get();

    return () => {
      sessionStorage.setItem("ctId", "all");
      sessionStorage.setItem("ctitle", "");
    };
  }, [page, filter]);
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
              {categorys?.length > 0 &&
                categorys?.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.title}
                  </option>
                ))}
            </select>
          </form>
          {filter != "all" && !isloading && product?.length > 0 && (
            <h2>
              Categoria: <i>{selectActegory}</i>
            </h2>
          )}
          <aside>
            {product?.length > 0 ?
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
              ))
            : <strong style={
              {
                position : 'absolute',
                left : '50%',
                top : '50%',
                transform : 'translate(-50%,-50%)',
                marginTop : '100px',
                textAlign : 'center'


              }
            }>
              {filter != "all" ? "Nenhum produto encontrado nessa categoria" : "Nenhum produto cadastrado"}
              </strong>}
          </aside>
          <button
            style={{
              display: lasPage > page ? "block" : "none",
            }}
            onClick={() => {
              if (lasPage > page) {
                setPage((prev) => prev + 1);
                return;
              } else {
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
