import React from "react";
import {FaLock, FaEnvelope,FaUser,FaSpinner }from "react-icons/fa";
import './Login.css'
import { useState } from "react";
import { useActionState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Login=()=>{
    const navigate = useNavigate();
    const [email,SetEmail]=useState("");
    const [senha,SetSenha]=useState("");
    const [logado,SetLogado]=useState(true);
    const [nome,SetNome]=useState("");
    const [loading, setLoading] = useState(false); 
      
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
                   }
            } catch (error) {
                console.error('Erro ao Cadastrar Usuário:', error);
            }

        }

    }
    return (
        <div className="conteiner">
       <form onSubmit={CadastroeLogin}>
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
        <button type="submit" className="botaologin">  {loading ? <FaSpinner className="spinner" /> :
         (logado ? "Entrar" : "Criar Conta")}</button>
       <div className="Cadastro">
        {logado?(<p>Não tem uma conta? <a href="#"onClick={UserCadastro}>Cadastre-se aqui!</a></p>)
        :(<p>Já tem uma conta? <a href="#"onClick={UserLogin}>Faça Login  aqui!</a></p>)};
        
       </div>
         </form>
       
        </div>
    );
}
export default Login;