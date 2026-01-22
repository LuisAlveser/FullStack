const{User}=require("../models");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");

async function cadastro  (req,res) {
     console.log(req.body.password);
    try{
         if (!req.body || !req.body.password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios." });
    }
    const salt= await bcryptjs.genSalt(10);
    const hashpassword= await bcryptjs.hash(req.body.password,salt);
   

    const user ={
        name:req.body.name,
        email:req.body.email,
        password:hashpassword

    }
    const usercreat= await User.create(user);
    if(usercreat){
        const token=jwt.sign({id:usercreat.id,email:usercreat.email},"Olá");
        return res.status(201).json({
            user:usercreat,
            token:token
        
    });
}
} catch(error){
       return res.status(500).json({ error: error.message });
}
}

async function login (req,res) {
    try{
    if(!req.body.email||!req.body.password){
         return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }
   
    const user=await User.findOne({where:{email:req.body.email}});
   
    const password=await bcryptjs.compare(req.body.password,user.password);
   
console.log(password);
    if(!user||!password){
  return res.status(400).json({ error: "Email ou Senha inválido"});
    }
     const token=jwt.sign({id:user.id,email:user.email},"Olá");
      return res.status(200).json({user:user,token:token});

    }catch(error){
       return res.status(500).json({ error: error.message });
    }
    
}
async function atualizarUser(req,res) {
    const id =req.params.id;
    try{
     const novoUser={
        name:req.body.name,
        email:req.body.email
     }
     if(req.body.pasword){
         const salt = await bcryptjs.genSalt(10);
         const hash = await bcryptjs.hash(req.body.password, salt);
         novoUser.password=hash;
     }
     const [linhas]= await User.update(novoUser,{where:{id:id}});
        if (linhas.length>0) {
      return res.status(404).json({ message: "Usuário não encontrado ou nenhum dado alterado" });
    }
       res.status(200).json({
        message:"Usuário atualizado com sucesso ",
      
       });

    }catch(error){
      return res.status(500).json({ error: error.message });   
    }
}
async function deleteUser(req,res) {
      const id =req.params.id;
      try {
        const user =await User.destroy({where:{id:id}});
        if(user){
    return res.status(200).json({ message: "Usuário excluido com sucesso" });
        }
         return res.status(404).json({ message: "Usuário não encontrado" });
      } catch (error) {
         return res.status(500).json({ error: error.message }); 
      }
    
    
}
module.exports={
    cadastro:cadastro,
    login:login,
    atualizarUser:atualizarUser,
    deleteUser:deleteUser

};