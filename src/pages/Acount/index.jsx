import "./index.css";
export default function Acount() {
  return (
    <section id="acount">
          <form>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                placeholder="entre com o nome ou seu nome"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="exeplo@gmail.com" />
            </div>
            <div>
              <label htmlFor="password">Palavra-Passe</label>
              <input type="password" id="password" placeholder="sua senha" />
            </div>
            <div>
              <label htmlFor="password1">Nova-Passe</label>
              <input
                type="password"
                id="password1"
                placeholder="nova senha (opcional)"
              />
            </div>
            <button
              onClick={() => {
              }}
            >
              Actualizar Perfil
            </button>
            
          </form>
    </section>
  );
}
