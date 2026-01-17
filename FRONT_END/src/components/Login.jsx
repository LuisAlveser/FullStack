import React from "react";
import {FaLock, FaEnvelope,FaUser}from "react-icons/fa";
import './Login.css'
import { useState } from "react";
import { useActionState } from "react";




const Login=()=>{
    const [email,SetEmail]=useState("");
    const [senha,SetSenha]=useState("");
    const [logado,SetLogado]=useState(true);
    const [nome,SetNome]=useState("");
       const handleLogin = (event) => {
        event.preventDefault(); 
        console.log("Dados enviados:", { email, senha });
    };
    const UserCadastro=(event)=>{
        SetLogado(false);
           
    };
     const UserLogin=(event)=>{
        SetLogado(true);
           
    };
    const CadastroeLogin=(event)=>{
        
    }
    return (
        <div className="conteiner">
       <form onSubmit={handleLogin}>
        <h1>{logado?"Login":"Cadastre-se"}</h1>
       {!logado && (
         <div className="campo_form">
            <FaUser className="icon" />
                <input 
                    type="text" 
                    placeholder="Nome Completo" 
                    onChange={(e) => SetNome(e.target.value)} 
                    />
              </div>
                )}
      <div className="campo_form">
        
            <FaEnvelope className="icon"/>
        <input type="email" placeholder="Email"onChange={(e)=>SetEmail(e.target.value)}/>
        
       </div>
         <div className="campo_form">
            <FaLock className="icon"/>
        <input type="password" placeholder="Senha" onChange={(e)=>SetSenha(e.target.value)}/>
        
       
       </div>
        <button className="botao">Login</button>
       <div className="Cadastro">
        {logado?(<p>Não tem uma conta? <a href="#"onClick={UserCadastro}>Cadastre-se aqui!</a></p>)
        :(<p>Já tem uma conta? <a href="#"onClick={UserLogin}>Faça Login  aqui!</a></p>)};
        
       </div>
         </form>
       
        </div>
    );
}
export default Login;