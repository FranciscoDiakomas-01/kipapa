/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { getClientData, UpdateClient } from "../../services/acount.js";
import "./index.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/loader'
import { validateCep } from "../../services/acount.js";
export default function Acount() {

  const nav = useNavigate();
  const [isloading, setIsloading] = useState(true);
  const [name, setName] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reload, setReload] = useState(false);const [cep, setCep] = useState("");
  const [qoute, setQuoute] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    setIsloading(true)
     if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
      setIsloading(false)
      nav("/login")
      return
    }
    async function get() {
      const response = await getClientData();
      setName((prev) => response?.name);
      setEmail((prev) => response?.email);
      setCity((prev) => response?.adress?.city);
      setQuoute((prev) => response?.adress?.qoute);
      setCep((prev) => response?.adress?.cep);
      setlastname((prev) => response?.lastname);
    }
    get();
    setTimeout(() => {
      setIsloading(false)
    },2000)
  }, [reload]);
  return (
    <section id="acount">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <h1>Dados da Minha Conta</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                !name ||
                !city ||
                !qoute ||
                !cep ||
                !email ||
                !password ||
                password?.length < 8
              ) {
                return toast.warn("Preencha todos campos corretamente");
              } else {
                if (newPass && newPass?.length < 8) {
                  return toast.warn("8 caracteres no mínimo");
                }
                if(!validateCep(cep)){
                  return toast.warn("Cep inválido")
                }
                const client = {
                  city: city,
                  cep: cep,
                  qoute: qoute,
                  email: email,
                  name: name,
                  password: newPass?.length > 0 ? newPass : password,
                  olPassWord: password,
                  lastname: lastname,
                };
                console.log(client);
                const response = await UpdateClient(client);
                console.log(response);
                if (response == "wrong password") {
                  return toast.warn("Palavra passe Errada");
                } else if (response) {
                  setReload((prev) => !prev);
                  return toast.success("Alterado com sucesso");
                } else {
                  return toast.error("Dados inválidos");
                }
              }
            }}
          >
            <div>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="entre com o nome ou seu nome"
              />
            </div>
            <div>
              <label htmlFor="lastname">Sobrenome</label>
              <input
                type="text"
                id="lastname"
                required
                value={lastname}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
                placeholder="entre com o nome ou seu sobrenome"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="exeplo@gmail.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div>
              <label htmlFor="cep">Cep</label>
              <input
                id="cep"
                placeholder="Entre com o cep"
                required
                value={cep}
                onChange={(e) => {
                  setCep(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                placeholder="Entre com a cidade"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="qoute">Bairro</label>
              <input
                id="qoute"
                placeholder="Entre com o bairro"
                required
                value={qoute}
                onChange={(e) => {
                  setQuoute(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Palavra-Passe</label>
              <input
                type="password"
                id="password"
                placeholder="sua senha"
                required
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password1">Nova-Passe</label>
              <input
                type="password"
                id="password1"
                placeholder="nova senha (opcional)"
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
              />
            </div>
            <button onClick={() => {}}>Actualizar Perfil</button>
          </form>
        </>
      )}
    </section>
  );
}
