import './index.css'

export default function Contact() {
    return (
      <section id='contact'>
        <article>
          <h1>Concato</h1>
        </article>
        <article>
          <h1>
            Entre em contacto com o Kipapa
          </h1>
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="exemplo@gmail.com"
              required
              name="email"
              id="email"
              autoFocus
            />
            <label htmlFor="tel">Número</label>
            <input
              type="tel"
              placeholder="+244 000 000 000"
              required
              name="tel"
              id="tel"
            />
            <label htmlFor="msg">Mensagem</label>
            <textarea
              placeholder="Escreve aqui oque voçê está a pensar"
              required
              name="msg"
              id="msg"
            />
            <button type='submit' >Enviar</button>
          </form>
        </article>
      </section>
    );
}