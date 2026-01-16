const{Board}=require("../models");
const{Column}=require("../models");
async function adicionarQuadro (req,res) {
 
    try {
    
          const board={
          title:req.body.title,
          id_owner:req.body.id_owner,
          };
        const novoBoard= await Board.create(board);
        if(novoBoard){
            return res.status(201).json({message:"Quadro criado com sucesso!!!"});
        }

        

    } catch (error) {
         return res.status(500).json({ error: error.message }); 
    }
}
async function buscaQuadrosPorUser(req,res) {
     const id=req.params.id;
     try {
        const quadro=await Board.findAll({ include: [{ 
                model: Column, 
            }],where:{id_owner:id}});
        if(quadro){
             return res.status(200).json(quadro);
        }
         return res.status(404).json({ message: "Usuário não tem quadros criados" });
     } catch (error) {
        return res.status(500).json({ error: error.message }); 
     }
     
    
}
async function atualizarQuadro(req,res) {
    const id=req.params.id;
    try {
       const statusFormatado = req.body.status ? req.body.status.toUpperCase() : undefined;
       console.log(statusFormatado);
        const quadro={
            
            title:req.body.title,
             status:statusFormatado
        };
        const [novoquadro]=await Board.update(quadro,{where:{id:id}});
        if(novoquadro>0){
        return res.status(200).json({message:"Quadro Atualizado com sucesso!!"});
        }
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
    
}
async function deleteQuadro(req,res) {
     const id=req.params.id;
     try {
        const quadro=await Board.destroy({where:{id:id}});
        if(quadro){
          return res.status(200).json({message:"Quadro deletado com sucesso!!!"})
        }
         return res.status(404).json({ message:"Quadro não encontrado" });
     } catch (error) {
         return res.status(500).json({ error: error.message }); 
     }
    
}
module.exports={
    adicionarQuadro:adicionarQuadro,
    buscaQuadrosPorUser:buscaQuadrosPorUser,
    atualizarQuadro:atualizarQuadro,
    deleteQuadro:deleteQuadro,
    
};