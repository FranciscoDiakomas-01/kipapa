import "./index.css";
import { useState, useEffect } from "react";
import { CanChekout } from "../../services/card";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../services/checkout";
export default function CheckOut() {

    const [checkoutDetails, setCheckoutDetails] = useState({
      street: "",
      Nhouse: "",
      qoute: "",
      city: "",
      methodPay : ''
    });
    const [payWay , setPayWay] = useState([])
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (CanChekout()) {
      setShow(true);
      setPayWay([
        {
          id: 1,
          name: "PayPal",
        },
        {
          id: 2,
          name: "Cash",
        },
        {
          id: 3,
          name: "Cartão de Crédito",
        },
        {
          id: 4,
          name: "Cartão de Débito",
        },
      ]);
    } else {
      nav("/product");
    }
  }, [nav]);
  return (
    <>
      {show && (
        <section id="checkout">
          <article>
            <h1>CheckOut</h1>
          </article>

          <article>
            <h1>Dados da Compra</h1>
            <form>
              <div>
                <label htmlFor="city">Município</label>
                <input
                  autoFocus
                  name="city"
                  id="city"
                  type="text"
                  placeholder="Entre com o nome do Município"
                  onChange={(e) => {
                    setCheckoutDetails((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="qoute" >Bairo</label>
                <input
                  type="text"
                  id="qoute"
                  placeholder="Entre com o nome do Bairro"
                  onChange={(e) => {
                    setCheckoutDetails((prev) => ({
                      ...prev,
                      qoute: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="street" >Rua</label>
                <input
                  type="text"
                  id="street"
                  placeholder="Entre com o nome ou número da rua"
                  onChange={(e) => {
                    setCheckoutDetails((prev) => ({
                      ...prev,
                      street: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label htmlFor="nhome">Nº Casa</label>
                <input
                  type="number"
                  id="nhome"
                  placeholder="Entre com o número da casa"
                  onChange={(e) => {
                    setCheckoutDetails((prev) => ({
                      ...prev,
                      Nhouse: e.target.value,
                    }));
                  }}
                />
              </div>
              <div>
                <label>Forma de Pagamento</label>
                <select
                  onChange={(e) => {
                    setCheckoutDetails((prev) => ({
                      ...prev,
                      methodPay: e.target.value,
                    }));
                  }}
                >
                  <option>Selecione uma forma de Pagamento</option>
                  {payWay.map((pay, index) => (
                    <option key={index} value={pay.id}>
                      {pay?.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <div>
              <button
                onClick={() => {
                  checkout(checkoutDetails);
                }}
              >
                Finalizar
              </button>
              <button onClick={() => {
                
                nav("/shop");
              }}>Minhas Comprar</button>
            </div>
          </article>
        </section>
      )}
    </>
  );
}
