const{Board,Column,User}=require("../models");

const { Op } = require("sequelize");
async function adicionarQuadro (req,res) {
 console.log("Dados recebidos no Body:", req.body);
    try {
    
          const board={
          title:req.body.title,
          id_owner:req.body.id_owner,
          status:req.body.status
          };
        const novoBoard= await Board.create(board);
        if(novoBoard){
            return res.status(201).json({message:"Quadro criado com sucesso!!!"});
        }

        

    } catch (error) {
      
    return res.status(500).json({ error: error.name, details: error.message });
    }
}
async function buscaQuadrosIniciadosPorUser(req, res) {
    const id = req.params.id;
    try {
        const quadro = await Board.findAll({ 
            include: [{ model: Column }],
            where: {
                id_owner: id,
                status: 'INICIADO' 
            } 
        });

     
        if (quadro.length > 0) {
            return res.status(200).json(quadro);
        }
        
        return res.status(404).json({ message: "Usuário não tem quadros iniciados" });
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
        else {
            return res.status(404).json({ message: "Quadro não encontrado ou nenhum dado alterado." });
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
async function buscaQuadrosEm_ExucucaoPorUser(req,res) {
     const id=req.params.id;
     try {
        const quadro=await Board.findAll({ include: [{ 
                model: Column, 
            }],where:{id_owner:id, 
      status: 'EM EXECUÇÃO' ,
    }});
        if(quadro.length>0){
             return res.status(200).json(quadro);
        }
         return res.status(404).json({ message: "Usuário não tem quadros criados em execução" });
     } catch (error) {
        return res.status(500).json({ error: error.message }); 
     }
     
    
}
async function buscaQuadrosTerminadosPorUser(req,res) {
     const id=req.params.id;
     try {
        const quadro=await Board.findAll({ include: [{ 
                model: Column 
            },{model:User}],where:{id_owner:id,
              status: 'TERMINADO' 
    }});
        if(quadro.length>0&&quadro){
             return res.status(200).json(quadro);
        }
         return res.status(404).json({ message: "Usuário não tem quadros criados Terminados" });
     } catch (error) {
        return res.status(500).json({ error: error.message }); 
     }
     
    
}
module.exports={
    adicionarQuadro:adicionarQuadro,
    buscaQuadrosIniciadosPorUser:buscaQuadrosIniciadosPorUser,
    atualizarQuadro:atualizarQuadro,
    deleteQuadro:deleteQuadro,
    buscaQuadrosEm_ExucucaoPorUser:buscaQuadrosEm_ExucucaoPorUser,
    buscaQuadrosTerminadosPorUser:buscaQuadrosTerminadosPorUser,
    
};