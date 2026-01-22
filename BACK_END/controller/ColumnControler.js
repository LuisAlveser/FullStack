const { where } = require("sequelize");
const{Column}=require("../models");

async function criaçãoColuna(req,res) {
   
    try {
        const column={
            title:req.body.title,
          description:req.body.description,
            id_board:req.body.id_board,

        }
        const Columns=await Column.create(column);
        if(Columns){
        return res.status(201).json({message:"Coluna criada com sucesso!!"});
        }
    } catch (error) {
         return res.status(500).json({ error: error.message }); 
    }
    
}
async function updateColumn(req,res) {
    const id =req.params.id;
    try {
      const upadateColumn ={
       title :req.body.title,
          description:req.body.description
      }  
      const [column] =await Column.update(upadateColumn,{where:{id:id}});
      if(column>0){
        return res.status(200).json({message:"Coluna atualizada com sucesso !!"});
      }
      return res.status(404).json({message:"Essa coluna não existe"});
    } catch (error) {
      return res.status(500).json({ error: error.message });  
    }
}
async function deletarColumn(req,res) {
    const id =req.params.id;
    try {
        const column=await Column.destroy({where:{id:id}});
        if(column){
          return   res.status(200).json({message:"Coluna excluida comsucesso!!"});
        }
        return  res.status(404).json({message:"Coluna não encontrada"});
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }

}
async function buscarTodosPorBoard(req,res) {
    const id= req.params.id;
    try {
        const columns= await Column.findAll({where:{id_board:id}});
        if(columns){
            return  res.status(200).json(columns);
        }
         return  res.status(404).json({message:"Não existem colunas relacionadas a esse quadro"});
    } catch (error) {
         return res.status(500).json({ error: error.message }); 
    }  
}
module.exports={
    criaçãoColuna:criaçãoColuna,
    updateColumn:updateColumn,
    deletarColumn:deletarColumn,
    buscarTodosPorBoard:buscarTodosPorBoard
}