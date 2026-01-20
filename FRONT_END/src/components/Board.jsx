import "./Board.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {FaSpinner }from "react-icons/fa";
const Board=()=>{
     const navigate = useNavigate();
      const [titulo, SetTitulo] = useState("");
     const [status, SetStatus] = useState("INICIADO");
     const[carregando,SetCarregando]=useState(false);
   const CriarQuadro=async (event)=>{
    event.preventDefault();
        try{
            SetCarregando(true);
            const usuario =localStorage.getItem("usuario");
            const usuarioObjeto = JSON.parse(usuario);
         const quadro={
            title:titulo,
            id_owner:usuarioObjeto.id,
            status:status
         }
          const novoquadro =await  axios.post("http://localhost:3001/board",quadro);
          if(novoquadro.status===201){
            navigate('/TelaPrincipal');
          }

        }
        catch(error){
                 console.error('Erro ao criar quadro:', error);
        }
   }
 return (
        <div className="conteiner"> 
            <h1>Título do Quadro</h1>
            <div className="campo_form">
                <form onSubmit={CriarQuadro}>
                    <input type="text" className="titulo" placeholder="Titulo do Quadro" onChange={(e)=>SetTitulo(e.target.value)} /> 
                    <label htmlFor="status">Escolha o Status:</label> 
                    <select 
                id="status"
                className="campo_select"
                value={status} 
                 onChange={(e) => SetStatus(e.target.value)}
                  >
                <option value="INICIADO">INICIADO</option>
                <option value="EM EXECUÇÃO">EM EXECUÇÃO</option>
                <option value="TERMINADO">TERMINADO</option>
               </select>                                                                      
                    <button className="botaologin2" >{carregando? <FaSpinner className="spinner" />:'Criar Quadro'} </button>
                </form>
            </div>
           
        </div>
    );
};
export default Board;