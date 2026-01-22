import React from "react";
import {FaLock, FaEnvelope,FaUser,FaSpinner }from "react-icons/fa";
import './Login.css'
import { useState, useEffect } from "react";
import { useActionState } from "react";
import axios from "axios";
import { useNavigate,useLocation } from 'react-router-dom';


const Login=()=>{
    
    const navigate = useNavigate();
      const location =  useLocation();
      
    const{dados}=location.state||{}
    const [email,SetEmail]=useState(dados?dados.email:"");
    const [senha,SetSenha]=useState("");
    const [logado,SetLogado]=useState(dados?false:true);
    const [nome,SetNome]=useState(dados?dados.name:"");
    const [loading, setLoading] = useState(false); 
  
    const editarUsuario=async (event)=>{
         event.preventDefault();
         setLoading(true)
          try {
            const id=dados.id;
            const usuario={
                name:nome,
                email:email,
                password:senha,
            }
           const usuarioeditado=await axios.patch(`http://localhost:3001/user/atualizar/${id}`,usuario);
           if(usuarioeditado.status===200){
                    alert("Dados atualizados com sucesso!!.");
                    const novoUsuario = { ...dados, name: nome, email: email };
                    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
                 navigate("/TelaPrincipal")
           }else{   console.error('Erro ao Atualizar  Usuário:', error);} 
        } catch (error) {
            console.error('Erro ao Atualizar  Usuário:', error);
            setLoading(false)
          }
    }  
    const UserCadastro=(event)=>{
        SetLogado(false);
           
    };
     const UserLogin=(event)=>{
        SetLogado(true);
           
    };
    const CadastroeLogin= async(event)=>{
          event.preventDefault();
         setLoading(true);
        if(logado===false){
              const user={
             name: nome,
             email: email,
            password:senha 
        }
            try {
                 const cadastro=await  axios.post("http://localhost:3001/user/",user);
                 if(cadastro.status===201){
                      const { user, token } = cadastro.data;
                         localStorage.setItem('token', token);
                         localStorage.setItem('usuario', JSON.stringify(user));
                       
                       navigate('/TelaPrincipal'); 
                 }else{
                    alert("Erro em Cadastrar Usuário")
                 }

            } catch (error) {
                console.error('Erro ao Cadastrar Usuário:', error);
            }
         
        }else{
              const user={
             email: email,
            password:senha,
        }
            try {
                   const login=await  axios.post("http://localhost:3001/user/login",user);
                   if(login.status===200){
                    const { user, token } = login.data;
                         localStorage.setItem('token', token);
                         localStorage.setItem('usuario', JSON.stringify(user));
                        navigate('/TelaPrincipal');
                   }else{
                    alert("Erro ao Logar Usuário")
                   }
            } catch (error) {
                console.error('Erro ao Logar Usuário:', error);
            }

        }

    }
    return (
        <div className="conteiner">
       <form onSubmit={dados?editarUsuario:CadastroeLogin}>
        <h1>{logado?"Login":dados?"Atualizar Dados":"Cadastre-se"}</h1>
       {!logado && (
         <div className="campo_form">
            <FaUser className="icon" />
                <input 
                    type="text" 
                    placeholder="Nome Completo"value={nome}
                    onChange={(e) => SetNome(e.target.value)} 
                    />
              </div>
                )}
      <div className="campo_form">
        
            <FaEnvelope className="icon"/>
        <input type="email"value={email} placeholder="Email"onChange={(e)=>SetEmail(e.target.value)}/>
        
       </div>
         <div className="campo_form">
            <FaLock className="icon"/>
        <input type="password"value={senha} placeholder="Senha" onChange={(e)=>SetSenha(e.target.value)}/>
        
       
       </div>
        <button type="submit" className="botaologin">  {loading ? <FaSpinner className="spinner" /> :
         (logado ? "Entrar" :dados?"Atualizar": "Criar Conta")}</button>
       <div className="Cadastro">
        {dados?"":logado?(<p>Não tem uma conta? <a href="#"onClick={UserCadastro}>Cadastre-se aqui!</a></p>)
        :(<p>Já tem uma conta? <a href="#"onClick={UserLogin}>Faça Login  aqui!</a></p>)};
        
       </div>
         </form>
       
        </div>
    );
}
export default Login;