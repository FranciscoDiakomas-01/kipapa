import './index.css'
import logo from '../../assets/321097281_1948082938901845_9073110493333833804_n.jpg'
import { useState } from 'react';
export default function Login() {
    const[active , setActive] = useState(true)
    return (
      <section id="login">
        {active ? (
          <>
            <form>
              <div>
                <span>
                  <img src={logo} />
                  <h1>Kipapa</h1>
                </span>
               <label htmlFor='email'>Email</label>
                <input type="email" placeholder="exemplo@gmail.com" required id='email' />
                <label htmlFor='pass'>Palavra-Passe</label>
                <input type="password" placeholder="Sua senha" required id='pass' />
                <button>Entrar</button>
                <a href="#" onClick={()=>{
                    setActive(false)
                }}>Não tem uma conta? Crair.</a>
              </div>
            </form>
            <article></article>
          </>
        ) : (
          <>
            <form>
              <div>
                <span>
                  <img src={logo} />
                  <h1>Kipapa</h1>
                </span>

                <label htmlFor='name'>Nome</label>
                <input type="text" placeholder="entre com seu nome" required  id='name'/>
                <label htmlFor='email'>Email</label>
                <input type="email" placeholder="exemplo@gmail.com" required id='email' />
                <label htmlFor='pass'>Palavra-Passe</label>
                <input type="password" placeholder="Sua senha" required id='pass' />
                <button>Criar Conta</button>
                <a href="#" onClick={()=>{
                    setActive(true)
                }}>Já tem uma conta? Entrar.</a>
              </div>
            </form>
            <article></article>
          </>
        )}
      </section>
    );
}