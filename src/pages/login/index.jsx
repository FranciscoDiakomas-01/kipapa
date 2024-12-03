/* eslint-disable no-unused-vars */
import './index.css'
import logo from '../../assets/321097281_1948082938901845_9073110493333833804_n.jpg'
import { useEffect, useState } from 'react';
import { login, singin } from '../../services/login.js';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [active, setActive] = useState(true)
  const [email, setEmail] = useState("")
  const [name , setName] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()

  useEffect(() => {
    setEmail(prev => "")
    setPassword(prev => "")
    setName(prev => "")
  }, [active]);

  async function InitLogin(e) {
    e.preventDefault()
    if (email?.length < 0 || password?.length < 8) {
      return toast.error("Preenha todos os dados")
    } else {
      const body = {
        email: email,
        password: password,
      };
      const response = await login(body)
      if (response) {
        toast.success("Logado com sucesso");
        localStorage.setItem("token", response?.token)
        localStorage.setItem("uid", response?.id);
        setTimeout(() => {
          nav("/")
        },1000)
        return
      } else {
        toast.error("Conta não existe")
        return
      }
    }
  }

    async function SignIN(e) {
      e.preventDefault();
      if (email?.length < 0 || password?.length < 8 || !name) {
        return toast.error("Preenha todos os dados");
      } else {
        const body = {
          email: email,
          password: password,
          name: name,
        };
        const response = await singin(body);
        if (response) {
          toast.success("Conta Criada com sucesso");
          const response1 = await login(body);
          localStorage.setItem("token", response1?.token);
          localStorage.setItem("uid", response1?.id);
          setTimeout(() => {
            nav("/");
          }, 1000);
          return;
        } else {
          toast.error("Dados Inválidos");
          return;
        }
      }
    }
    return (
      <section id="login">
        <ToastContainer></ToastContainer>
        {active ? (
          <>
            <form onSubmit={InitLogin}>
              <div>
                <span>
                  <img src={logo} />
                  <h1>Kipapa</h1>
                </span>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="exemplo@gmail.com"
                  required
                  id="email"
                  onChange={(e) => {
                    setEmail((prev) => e.target.value);
                  }}
                />
                <label htmlFor="pass">Palavra-Passe</label>
                <input
                  type="password"
                  placeholder="Sua senha"
                  required
                  id="pass"
                  onChange={(e) => {
                    setPassword((prev) => e.target.value);
                  }}
                />
                <button>Entrar</button>
                <a
                  href="#"
                  onClick={() => {
                    setEmail((prev) => "");
                    setPassword((prev) => "");
                    setActive((prev) => false);
                  }}
                >
                  Não tem uma conta? Crair.
                </a>
              </div>
            </form>
            <article></article>
          </>
        ) : (
          <>
            <form onSubmit={SignIN}>
              <div>
                <span>
                  <img src={logo} />
                  <h1>Kipapa</h1>
                </span>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  placeholder="entre com seu nome"
                  required
                  id="email"
                  onChange={(e) => {
                    setName((prev) => e.target.value);
                  }}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="exemplo@gmail.com"
                  required
                  id="email"
                  onChange={(e) => {
                    setEmail((prev) => e.target.value);
                  }}
                />
                <label htmlFor="pass">Palavra-Passe</label>
                <input
                  type="password"
                  placeholder="Sua senha"
                  required
                  id="pass"
                  onChange={(e) => {
                    setPassword((prev) => e.target.value);
                  }}
                />

                <button>Criar Conta</button>
                <a
                  href="#"
                  onClick={() => {
                    setActive((prev) => true);
                  }}
                >
                  Já tem uma conta? Entrar.
                </a>
              </div>
            </form>
            <article></article>
          </>
        )}
      </section>
    );
}