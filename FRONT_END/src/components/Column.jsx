import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import {FaSpinner }from "react-icons/fa";

const Column=()=>{
    const navigate = useNavigate();
      const location = useLocation();
   const { dados, dadoscolumn } = location.state || {};
     const atualizarColumn=async (event)=>{
          event.preventDefault();
          SetCarregando(true)
        try{
            const id =dadoscolumn.id;
            const column ={
                title:titulo,
                description:descricao

            }
           const columnnew=await axios.patch(`http://localhost:3001/column/${id}`,column);
           if(columnnew.status===200){
             alert("Coluna atualizada  com sucesso");
             SetCarregando(false)
             navigate("/TelaPrincipal")
           }else{
              alert("Erro em atualizar coluna");
              SetCarregando(false)
           }

          
        }
        catch(error){
             console.error("Erro ao atualizar Column:", error);
            alert("Não foi possível atualizar column");
        }
     } 
      
      const [titulo, SetTitulo] = useState(dadoscolumn?dadoscolumn.title:"");
     const [descricao, SetDescricao] = useState(dadoscolumn?dadoscolumn.description:"");
     const[carregando,SetCarregando]=useState(false);
    const adicionarColumn=async (event)=>{
        event.preventDefault();
         SetCarregando(true);
        try{
            const coluna={
                  title:titulo,
                 description:descricao,
                  id_board:dados.id
            };
            const response=await axios.post(`http://localhost:3001/column`,coluna);
            if(response.status===201){
            navigate("/TelaPrincipal");
        }
        }
        
        catch(error){
          console.error("Erro ao excluir:", error);
            alert("Não foi possível adicionar coluna.");
        }finally {
            SetCarregando(false); 
        }
       
     }
    return(
      <div className="conteiner"> 
                 <h1>{dadoscolumn?"Atualizar Coluna":'Adicionar Coluna'}</h1>
                 <div className="campo_form">
                     <form onSubmit={dadoscolumn?atualizarColumn:adicionarColumn} >
                         <input type="text" className="titulo" value={titulo} placeholder="Titulo da Coluna" onChange={(e)=>SetTitulo(e.target.value)} /> 
                          <input type="text" className="descrição" value={descricao} placeholder="Descrição da Coluna" onChange={(e)=>SetDescricao(e.target.value)} /> 
                                                                                         
                         <button className="botaologin2" >{carregando? <FaSpinner className="spinner" />:dadoscolumn?"Atualizar Column":"Criar Coluna"} </button>
                     </form>
                 </div>
                
             </div>
    );
}
export default Column;