import "./index.css";
import { useState, useEffect } from "react";
import Loader from "../../components/loader";
export default function Shop() {
  const [shops, setShop] = useState([]);
  const [isLoading, setIsloadin] = useState(true);
  useEffect(() => {
    setShop([
      {
        id: 201,
        date: new Date().toLocaleDateString("pt"),
        status: 2,
        buget: Number(1000).toLocaleString("pt"),
        totalProdut: 20,
        hour: new Date().toLocaleTimeString("pt"),
      },
      {
        id: 201,
        date: new Date().toLocaleDateString("pt"),
        status: 3,
        buget: Number(1000).toLocaleString("pt"),
        totalProdut: 20,
        hour: new Date().toLocaleTimeString("pt"),
      },
      {
        id: 201,
        date: new Date().toLocaleDateString("pt"),
        status: 1,
        buget: Number(1000).toLocaleString("pt"),
        totalProdut: 20,
        hour: new Date().toLocaleTimeString("pt"),
      },
      {
        id: 201,
        date: new Date().toLocaleDateString("pt"),
        status: 5,
        buget: Number(1000).toLocaleString("pt"),
        totalProdut: 20,
        hour: new Date().toLocaleTimeString("pt"),
      },
    ]);
    setTimeout(() => {
      setIsloadin(false);
    }, 1500);
  }, []);
  return (
    <section id="shops">
      <article>
        <h1>Minhas Compras</h1>
      </article>
      <article>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {shops.map((item, index) => (
              <figure key={index}>
                <span>#{item.id}</span>
                <p> Data : {item.date}</p>
                <p>Horário : {item.hour}</p>
                <stron>Orçamento : {item.buget}kz</stron>
                <p>Total Produtos : {item.totalProdut}</p>
                {item.status == 1 ? (
                  <p
                    style={{
                      backgroundColor: "#1e9f79",
                      color: "#02ffb3",
                    }}
                  >
                    Conlcuído
                  </p>
                ) : item.status == 2 ? (
                  <p
                    style={{
                      backgroundColor: "#ddbe0f",
                      color: "white",
                    }}
                  >
                    Em Produção
                  </p>
                ) : item.status == 3 ? (
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
            <table>
              <thead>
                <tr>
                  <td>#Id</td>
                  <td>Data</td>
                  <td>Hora</td>
                  <td>Orçamento</td>
                  <td>Produtos</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {shops.map((item, index) => (
                  <tr key={index}>
                    <td>#{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.hour}</td>
                    <td>{item.buget}kz</td>
                    <td>{item.totalProdut}</td>
                    <td>
                      {item.status == 1 ? (
                        <p>Conlcuído</p>
                      ) : item.status == 2 ? (
                        <p
                          style={{
                            backgroundColor: "#ddbe0f",
                            color: "white",
                          }}
                        >
                          Em Produção
                        </p>
                      ) : item.status == 3 ? (
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
            <p>1 de 1</p>
            <span>
              <button>Prev</button>
              <button>Next</button>
            </span>
          </>
        )}
      </article>
    </section>
  );
}
