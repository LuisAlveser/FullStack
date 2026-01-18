import './TelaPrincipal.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TelaPrincipal=()=>{

    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const sair=async (event)=>{
       localStorage.removeItem("token"); 
    localStorage.removeItem("usuario");
    navigate("/");
           
    };
     useEffect(() => {
        const dadosSalvos = localStorage.getItem('usuario');
        setUsuario(JSON.parse(dadosSalvos));
    }, []);
    if (!usuario) return <p>Carregando...</p>;
    return(
        <div className='Tela'>
        <div className="layout-container">
        <header className='cabecalho'>
             <h1 className='texto'>{usuario.name}!</h1>
             <button className='botao'onClick={sair}>Sair</button>
              <button className='botao2'>Adicionar Quadro</button>
        </header>
        </div>
        </div>
    );
}
export default TelaPrincipal;