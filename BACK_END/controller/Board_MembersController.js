const { where } = require("sequelize");
const{Board_Members,User,Board}=require("../models");
async function adicionar_membros (req,res) {
    try {
            const membros={
        id_user:req.body.id_user,
        id_board:req.body.id_board
       }    
       const novomembro=await Board_Members.create(membros);
       if(novomembro){
         return res.status(201).json({message:"Membro adicionado com sucesso!!"});
       }
    } catch (error) {
         return res.status(404).json({message:"Nenhum card encontrado!!!"});
        
    }   


}
async function listadeMembros(req,res) {
    try {
        const lista=await Board_Members.findAll({include: [{model: Board},{model:User}]});
       if(lista){
          return res.status(200).json(lista);
       }
    } catch (error) {
         return res.status(500).json({message:error});
    }
    
}
async function delete_membro(req,res) {
    const id =req.params.id;
    try {
        const membro=await Board_Members.destroy({where:{id:id}});
        if(membro){
              return res.status(200).json({message:"Membro deletado"});
        }
         return res.status(404).json({message:"Membro não encontrado"});
    } catch (error) {
         return res.status(404).json({message:"Nenhum card encontrado!!!"});
    }
    
}
module.exports={
    adicionar_membros:adicionar_membros,
    listadeMembros:listadeMembros,
    delete_membro:delete_membro,
}

