/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import { useState, useEffect } from "react";
import Loader from "../../components/loader";
import { getMyOrders } from "../../services/shops.js";
import { useNavigate } from "react-router-dom";
  import AOS from "aos";
export default function Shop() {
  const [shops, setShop] = useState([]);
  const [isLoading, setIsloadin] = useState(true);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const nav = useNavigate()
  const [pagination, setPagination] = useState({
    lastPage: 0,
    currentPage: 0,
  });
  useEffect(() => {

    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      easing: "ease-in-out", // Função de timing
      offset: 200, // Deslocamento em pixels
    });
    AOS.refresh();
    if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
      nav("/login")
    }
    async function get() {
      const response = await getMyOrders(page , 10);
      setShop(response?.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: response?.page,
        lastPage: response?.latPage,
      }));
    }
    get();
    setTimeout(() => {
      setIsloadin(false);
    }, 1500);
  }, [page, reload]);
  return (
    <section id="shops">
      <article>
        <h1>Meus Pedidos</h1>
      </article>
      <article>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {Array.isArray(shops) && shops?.length > 0 ? (
              <>
                {
                  //Mobile
                }
                <aside>
                  {Array.isArray(shops) &&
                    shops?.length > 0 &&
                    shops.map((item, index) => (
                      <figure key={index} data-aos="flip-left">
                        <span>Pedido Nº {item.id}</span>
                        <p> Data : {item?.created_at}</p>
                        <p>
                          F. Pagamento :{" "}
                          {String(
                            item?.order_detais?.payForm
                          ).toLocaleLowerCase()}
                        </p>
                        <p>Produtos : {item.order_detais?.totalPoduct}</p>
                        <strong>
                          Orçamento :{" "}
                          {Number(item?.order_detais?.total_Pay).toLocaleString(
                            "pt"
                          )}
                          kz
                        </strong>
                        <p>
                          Entregador :{" "}
                          {item?.delivery?.name ? item?.delivery?.name : "..."}
                        </p>
                        <p>
                          Email :{" "}
                          {item?.delivery?.email
                            ? item?.delivery?.email
                            : "..."}
                        </p>
                        {item.status == 3 ? (
                          <p
                            style={{
                              backgroundColor: "#1e9f79",
                              color: "#02ffb3",
                            }}
                          >
                            Conlcuído
                          </p>
                        ) : item.status == 1 ? (
                          <p
                            style={{
                              backgroundColor: "#ddbe0f",
                              color: "white",
                            }}
                          >
                            Em Produção
                          </p>
                        ) : item.status == 2 ? (
                          <p
                            style={{
                              backgroundColor: "#1375a9",
                              color: "white",
                            }}
                          >
                            Á caminho
                          </p>
                        ) : (
                          <p
                            style={{
                              backgroundColor: "red",
                              color: "white",
                            }}
                          >
                            Cancelado
                          </p>
                        )}
                      </figure>
                    ))}
                </aside>

                {
                  //PC or Tablet
                }
                <table>
                  <thead>
                    <tr>
                      <td>Pedido Nº</td>
                      <td>Data</td>
                      <td>Produtos</td>
                      <td>Orçamento</td>
                      <td>F. Pagamento</td>
                      <td>Nome Entregador</td>
                      <td>Email</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(shops) &&
                      shops?.length > 0 &&
                      shops.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item?.created_at}</td>
                          <td>{item.order_detais?.totalPoduct}</td>
                          <td>
                            {Number(
                              item?.order_detais?.total_Pay
                            ).toLocaleString("pt")}
                            kz
                          </td>
                          <td>
                            {String(
                              item?.order_detais?.payForm
                            ).toLocaleLowerCase()}
                          </td>
                          <td>
                            {item?.delivery?.name
                              ? item?.delivery?.name
                              : "..."}
                          </td>
                          <td>
                            {item?.delivery?.email
                              ? item?.delivery?.email
                              : "..."}
                          </td>
                          <td>
                            {item.status == 3 ? (
                              <p>Conlcuído</p>
                            ) : item.status == 1 ? (
                              <p
                                style={{
                                  backgroundColor: "#ddbe0f",
                                  color: "white",
                                }}
                              >
                                Em Produção
                              </p>
                            ) : item.status == 2 ? (
                              <p
                                style={{
                                  backgroundColor: "#1375a9",
                                  color: "white",
                                }}
                              >
                                Á caminho
                              </p>
                            ) : (
                              <p
                                style={{
                                  backgroundColor: "red",
                                  color: "white",
                                }}
                              >
                                Cancelado
                              </p>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <p>
                  {pagination.currentPage} de
                  {pagination.lastPage == 0
                    ? pagination.lastPage + 1
                    : pagination.lastPage}
                </p>
                <span>
                  <button
                    onClick={() => {
                      if (page <= 1) {
                        return;
                      } else {
                        setPage((prev) => prev - 1);
                        setReload((prev) => !prev);
                        return;
                      }
                    }}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => {
                      if (
                        pagination?.lastPage == page ||
                        pagination?.lastPage == 0
                      ) {
                        return;
                      } else {
                        setPage((prev) => prev + 1);
                        setReload((prev) => !prev);
                        return;
                      }
                    }}
                  >
                    Next
                  </button>
                </span>
              </>
            ) : (
              <h1
                style={{
                  fontSize: "22pt",
                  color: "var(--pink)",
                }}
              >
                Sem Pedidos
              </h1>
            )}
          </>
        )}
      </article>
    </section>
  );
}
