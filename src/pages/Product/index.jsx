import './index.css'
import { useState, useEffect } from 'react';
import image from '../../assets/pngegg (9).png'
import { FaShoppingCart , FaSearch} from 'react-icons/fa';
import Loader from '../../components/loader';
import { addProduct } from '../../services/card';
import { toast } from 'react-toastify';
export default function Product() {
  const [product, setProduct] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [categorys, setCategorys] = useState([])
    useEffect(() => {
        setProduct([
          {
            name: "Hambuguer",
            description: "Hambuguer de Frango com molho picante",
            price: 1000,
            id: crypto.randomUUID(),
            image_url: image,
            oldprice: 1500,
            promotional: true,
          },
          
          {
            name: "Pizza",
            description: "Hambuguer de Frango com molho picante",
            price: 2000,
            id: crypto.randomUUID(),
            image_url: image,
            oldprice: 1500,
            promotional: true,
          },
        ]);
      setCategorys([
        {
          id: crypto.randomUUID(),
          title: "Todos",
        },
        {
          id: crypto.randomUUID(),
          title: "Comidas",
        },
        {
          id: crypto.randomUUID(),
          title: "Bebidas",
        },
      ]);
      setTimeout(() => {
        setIsloading(false)
      }, 2000)
    },[])
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
            <h2>Últimos Produtos</h2>
            <aside>
              {Array.isArray(product) &&
                product.map((prod) => (
                  <figure key={prod.id}>
                    <p>Novo</p>
                    <div>
                      <img src={prod.image_url} loading="lazy" />
                    </div>
                    <figcaption>
                      <h3>{prod.name}</h3>
                      <strong>
                        {Number(prod.price).toLocaleString("pt")}kz
                      </strong>
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
                            price: prod.price,
                            description: prod.description,
                            image_url: prod.image_url,
                            id : prod.id
                          }; 
                          addProduct(pr);
                          toast.success("Produto Adicionado!")
                        }}
                      >
                        <FaShoppingCart />
                      </button>
                    </aside>
                  </figure>
                ))}
            </aside>
            <h2>Produtos Promocionais</h2>
            <aside>
              {product.map((prod) => (
                <figure key={prod.id}>
                  <div>
                    <img src={prod.image_url} loading="lazy" />
                  </div>
                  <figcaption>
                    <h3>{prod.name}</h3>
                    <div>
                      <strong>
                        {Number(prod.price).toLocaleString("pt")}kz
                      </strong>
                      {prod.oldprice && (
                        <del>
                          {Number(prod.oldprice).toLocaleString("pt")}
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
                          price: prod.price,
                          description: prod.description,
                          image_url: prod.image_url,
                          id: prod.id,
                        }; 
                        addProduct(pr);
                          toast.success("Produto Adicionado!")
                      }}
                    >
                      <FaShoppingCart />
                    </button>
                  </aside>
                </figure>
              ))}
            </aside>
            <button>
              <p>Ver Mais</p>
            </button>
          </>
        )}
      </section>
    );
}