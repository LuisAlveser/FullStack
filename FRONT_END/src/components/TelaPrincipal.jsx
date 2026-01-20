import './TelaPrincipal.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPen,FaTrash } from "react-icons/fa";
import axios from 'axios';
import { MdOutlineAdd } from "react-icons/md";
const TelaPrincipal=()=>{

    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const [quadrosIniciados,SetquadrosIniciados]=useState([]);
    const [quadrosEm_Execucao,SetquadrosEm_Excucao]=useState([]);
     const [quadrosTerminados,SetquadrosTerminados]=useState([]);
     
    useEffect(() => {
       const usuario= localStorage.getItem("usuario");
       const usuarioObjeto =JSON.parse(usuario);
       const id =usuarioObjeto.id
       axios.get(`http://localhost:3001/board/iniciados/${id}`) 
      .then(response => {
        SetquadrosIniciados(response.data); 
      })
      .catch(error => {
        console.error("Erro ao buscar Quadro iniciados:", error);
      });
  }, []); 
    useEffect(() => {
       const usuario= localStorage.getItem("usuario");
       const usuarioObjeto =JSON.parse(usuario);
       const id =usuarioObjeto.id
       axios.get(`http://localhost:3001/board/em_execucao/${id}`) 
      .then(response => {
        SetquadrosEm_Excucao(response.data); 
      })
      .catch(error => {
        console.error("Erro ao buscar Quadros em execução:", error);
      });
  }, []);
   useEffect(() => {
       const usuario= localStorage.getItem("usuario");
       const usuarioObjeto =JSON.parse(usuario);
       const id =usuarioObjeto.id
       axios.get(`http://localhost:3001/board/terminado/${id}`) 
      .then(response => {
        SetquadrosTerminados(response.data); 
      })
      .catch(error => {
        console.error("Erro ao buscar Quadros Terminados:", error);
      });
  }, []);
    const sair=async (event)=>{
       localStorage.removeItem("token"); 
    localStorage.removeItem("usuario");
    navigate("/");
           
    };
    const excluirQuadro=async (id)=>{
       try {
            await axios.delete(`http://localhost:3001/board/${id}`);
            
           
            SetquadrosIniciados(quadrosIniciados.filter(q => q.id !== id));
            SetquadrosEm_Excucao(quadrosEm_Execucao.filter(q => q.id !== id));
            SetquadrosTerminados(quadrosTerminados.filter(q => q.id !== id));
            
            alert("Quadro excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Não foi possível excluir o quadro.");
        }
      
    }
    const criarquadro=async (event)=>{
    
    navigate("/Board");
           
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
              <button className='botao2' onClick={criarquadro}>Adicionar Quadro</button>
        </header>
        </div>
        <div className='quadros'>
           <h1>Inicializado</h1> 
            <div className='divisor'></div>
              <div>
     
      {quadrosIniciados.length > 0 ? (
        <ul>
          {quadrosIniciados.map(quadrosIniciados => (
            <li key={quadrosIniciados.id}>
              {quadrosIniciados.title}   {"Lider :"+usuario.name} 
               <div className="acoes-quadro">
        <button title="Add" onClick={() => handleEditar(quadro.id)}>
          <MdOutlineAdd color="#4ee6c2" />
        </button>
        <button title="Editar" onClick={() => handleEditar(quadro.id)}>
          <FaPen color="#ffc107" />
        </button>

       
        <button title="Excluir" onClick={()=>excluirQuadro(quadrosIniciados.id)}>
          <FaTrash color="#f44336" />
        </button>
         
      </div>
      <div className="lista-colunas">
        {quadrosIniciados.Columns && quadrosIniciados.Columns.length > 0 ? (
          quadrosIniciados.Columns.map(coluna => (
            <span key={coluna.id} className="tag-coluna">
              {coluna.title}
            </span>
          ))
        ) : (
          <small>Nenhuma coluna definida</small>
        )}
      </div>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>Nenhum Quadro adicionado</p>
      )}
    </div>
    
        </div>
         <div className='quadros'>
           <h1>Em Execução</h1> 
             <div className='divisor'></div>
               <div>
     
      {quadrosEm_Execucao.length > 0 ? (
        <ul>
          {quadrosEm_Execucao.map(quadrosEm_Execucao => (
            <li key={quadrosEm_Execucao.id}>
              {quadrosEm_Execucao.title}   
               <div className="acoes-quadro">
        <button title="Add" onClick={() => handleEditar(quadro.id)}>
          <MdOutlineAdd color="#4ee6c2" />
        </button>
        <button title="Editar" onClick={() => handleEditar(quadro.id)}>
          <FaPen color="#ffc107" />
        </button>

       
        <button title="Excluir" onClick={()=>excluirQuadro(quadrosEm_Execucao.id)}>
          <FaTrash color="#f44336" />
        </button>
         
      </div>
      <div className="lista-colunas">
        {quadrosEm_Execucao.Columns && quadrosEm_Execucao.Columns.length > 0 ? (
          quadrosEm_Execucao.Columns.map(coluna => (
            <span key={coluna.id} className="tag-coluna">
              {coluna.title}
            </span>
          ))
        ) : (
          <small>Nenhuma coluna definida</small>
        )}
      </div>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>Nenhum Quadro adicionado</p>
      )}
    </div>
    
             
        </div>
        <div className='quadros'>
           <h1>Terminado</h1> 
             <div className='divisor'></div>
               <div>
     
      {quadrosTerminados.length > 0 ? (
        <ul>
          {quadrosTerminados.map(quadrosTerminados => (
            <li key={quadrosTerminados.id}>
              {quadrosTerminados.title} 
               <div className="acoes-quadro">
        <button title="Add" onClick={() => handleEditar(quadro.id)}>
          <MdOutlineAdd color="#4ee6c2" />
        </button>
        <button title="Editar" onClick={() => handleEditar(quadro.id)}>
          <FaPen color="#ffc107" />
        </button>

       
        <button title="Excluir" onClick={()=>excluirQuadro(quadrosTerminados.id) }>
          <FaTrash color="#f44336" />
        </button>
         
      </div>
      <div className="lista-colunas">
        {quadrosTerminados.Columns && quadrosTerminados.Columns.length > 0 ? (
          quadrosTerminados.Columns.map(coluna => (
            <span key={coluna.id} className="tag-coluna">
              {coluna.title}
            </span>
          ))
        ) : (
          <small>Nenhuma coluna definida</small>
        )}
      </div>
            </li>
            
          ))}
        </ul>
      ) : (
        <p>Nenhum Quadro adicionado</p>
      )}
    </div>
    
        </div>
        </div>
    );
}
export default TelaPrincipal;