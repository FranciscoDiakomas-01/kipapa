/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import { useState, useEffect } from "react";
import { CanChekout } from "../../services/card";
import { useNavigate } from "react-router-dom";
import {createOrder } from "../../services/checkout.js";
import { getClientData } from "../../services/acount.js";
import { getAllPayForm } from "../../services/pay.js";
import { toast } from "react-toastify";
export default function CheckOut() {
    const [checkoutDetails, setCheckoutDetails] = useState({
      cep: "",
      qoute: "",
      city: "",
      methodPay : ''
    });
    const [payWay , setPayWay] = useState([])
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
     if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
      nav("/login")
    }
    if (CanChekout()) {
      setShow(true);
      async function getClienAdress() {
        const payForm = await getAllPayForm()
        setPayWay(payForm?.data)
        const adress = await getClientData();
        if (adress?.adress?.cep  && adress?.adress?.city && adress?.adress?.qoute) {
          setCheckoutDetails((prev) => ({
            ...prev,
            cep: adress?.adress?.cep,
            city: adress?.adress?.city,
            qoute: adress?.adress?.qoute,
          }));
          return;
        } 
      }
      getClienAdress();
    } else {
      nav("/product");
    }
  }, []);
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
              <span>
                <div>
                  <label htmlFor="city">Cidade</label>
                  <input
                    autoFocus
                    name="city"
                    id="city"
                    value={checkoutDetails.city}
                    type="text"
                    required
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
                  <label htmlFor="qoute">Bairo</label>
                  <input
                    type="text"
                    id="qoute"
                    required
                    placeholder="Entre com o nome do Bairro"
                    value={checkoutDetails.qoute}
                    onChange={(e) => {
                      setCheckoutDetails((prev) => ({
                        ...prev,
                        qoute: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="street">Cep</label>
                  <input
                    type="text"
                    id="street"
                    required
                    placeholder="Entre com o nome ou número da rua"
                    value={checkoutDetails.cep}
                    onChange={(e) => {
                      setCheckoutDetails((prev) => ({
                        ...prev,
                        cep: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div>
                  <label>Forma de Pagamento</label>
                  <select
                    required
                    onChange={(e) => {
                      setCheckoutDetails((prev) => ({
                        ...prev,
                        methodPay: e.target[e.target.selectedIndex].textContent,
                      }));
                    }}
                  >
                    <option>Selecione uma forma de Pagamento</option>
                    {payWay.map((pay, index) => (
                      <option key={index} value={pay.id}>
                        {pay?.title}
                      </option>
                    ))}
                  </select>
                </div>
              </span>

              <div>
                <button
                  onClick={async (e) => {
                    e.preventDefault()
                    const response = await createOrder(checkoutDetails);
                    if (response) {
                      toast.success("Pedido enviado com sucesso!");
                      localStorage.setItem("card", []);
                      nav("/");
                      return;
                    } else {
                      toast.error("Preencha todos os Campos");
                      return;
                    }
                  }}
                >
                  Finalizar
                </button>
                <button
                  onClick={() => {
                    nav("/shop");
                  }}
                >
                  Minhas Comprar
                </button>
              </div>
            </form>
          </article>
        </section>
      )}
    </>
  );
}
