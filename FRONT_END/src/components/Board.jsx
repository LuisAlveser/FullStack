import "./Board.css"
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import {FaSpinner }from "react-icons/fa";

const Board=()=>{
     const navigate = useNavigate();
      const location = useLocation();
      const{dados}=location.state||{}
      const [titulo, SetTitulo] = useState(dados?dados.title:"");
     const [status, SetStatus] = useState(dados?dados.status:"INICIADO");
     const[carregando,SetCarregando]=useState(false);
     const atualizarQuadro=async (event)=>{
        event.preventDefault();
        try{
            const quadro={
                  title:titulo,
            status:status
            };
            const response=await axios.patch(`http://localhost:3001/board/${dados.id}`,quadro);
            if(response.status===200){
            navigate("/TelaPrincipal");
        }
        }
        
        catch(error){
          console.error("Erro ao excluir:", error);
            alert("Não foi possível atualiza  o quadro.");
        }finally {
            SetCarregando(false); 
        }
       
     }
   const CriarQuadro=async (event)=>{
    event.preventDefault();
    SetCarregando(true);
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
            <h1>{dados?"Atualizar Quadro":'Título do Quadro'}</h1>
            <div className="campo_form">
                <form onSubmit={dados?atualizarQuadro:CriarQuadro}>
                    <input type="text" className="titulo" value={titulo} placeholder="Titulo do Quadro" onChange={(e)=>SetTitulo(e.target.value)} /> 
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
                    <button className="botaologin2" >{carregando? <FaSpinner className="spinner" />:dados?"Atualizar Quadro":"Criar Quadro"} </button>
                </form>
            </div>
           
        </div>
    );
};
export default Board;