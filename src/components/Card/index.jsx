import "./index.css";
import { useState, useEffect } from "react";
import { getbuget, getTotalProduct  , addProduct , getAllProduct , removeProduct , CanChekout} from "../../services/card";
import { toast } from "react-toastify";
import { FaSync , FaShoppingBag} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Card() {
  const navigate = useNavigate()
  const [buget, setBuget] = useState(0);
  const [totalPro, setTotalProd] = useState(0);
  const [product, setProduct] = useState([]);
  const [reload , setReload] = useState(false)
  useEffect(() => {
    if (
      localStorage.getItem("card") == null ||
      localStorage.getItem("card") == undefined
    ) {
      toast.info("Carrinha Vazia");
      localStorage.setItem("card", []);
    }
    setBuget(getbuget());
    setTotalProd(getTotalProduct());
    setProduct(getAllProduct());
  }, [reload]);
  return (
    <article
      id="card"
      onMouseLeave={() => {
        document.getElementById("card").classList.remove("open");
      }}
    >
      <button
        onClick={() => {
          setReload((prev) => !prev);
        }}
      >
        <FaSync />
      </button>
      <aside>
        {product?.length > 0 ? (
          <>
            {product?.map((pr, index) => (
              <div key={index}>
                <img src={pr?.image_url} loading="lazy" />
                <span>
                  <strong>Nome : {pr?.name}</strong>
                  <i>Preço : {Number(pr?.price).toLocaleString("pt")}kz</i>
                  <p>Qtd : {pr.qtd}</p>
                  <div>
                    <button
                      onClick={() => {
                        addProduct(pr);
                        setReload((prev) => !prev);
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        removeProduct(pr);
                        setReload((prev) => !prev);
                      }}
                    >
                      -
                    </button>
                  </div>
                </span>
              </div>
            ))}
          </>
        ) : (
          <h1>
            {" "}
            <FaShoppingBag /> Carrinha Vazia
          </h1>
        )}
      </aside>
      <div>
        <span>
          <div>Total Produtos : {totalPro}</div>
          <div>Total Orçamento : {buget}kz</div>
        </span>
        <button
          onClick={() => {
            if (CanChekout()) {
              document.getElementById("card").classList.remove("open");
              navigate("/checkout");
              return;
            } else {
              if (
                localStorage.getItem("token") == undefined &&
                localStorage.getItem("token") == null
              ) {
                toast.info("Inicie sessão");
                setTimeout(() => {
                  navigate("/login");
                }, 1000);
                return;
              }
              toast.warn("A sua Carrinha Está Vazia!");
              setTimeout(() => {
                navigate("/product");
              }, 1000);
              return;
            }
          }}
        >
          Finalizar a Compra{" "}
        </button>
      </div>
    </article>
  );
}
