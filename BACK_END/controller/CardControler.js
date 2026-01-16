const { where } = require("sequelize");
const {Card}=require("../models");
const {Column}=require("../models");

async function criacaoCard(req,res) {
    try{
        const card={
        title:req.body.title,
         description:req.body.description,
        id_column:req.body.id_column
    };
    const novoCard=await Card.create(card);
    if(novoCard){
        return res.status(201).json({message:"Card criado com sucesso!!!"});
    } 
}catch(error){
    return res.status(500).json({ error: error.message }); 
}   
}
async function atualizarCard(req,res) {
    const id =req.params.id;
    try {
        const novocard={
         title:req.body.title,
         description:req.body.description,
        };
        const [card]= await Card.update(novocard,{where:{id:id}});
        if(card>0){
         return res.status(200).json({message:"Card atualizado com sucesso!!!"});
        }

          return res.status(404).json({message:"Nenhum card encontrado!!!"});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}
async function verCardsporID(req,res) {
   const id =req.params.id;
    try {
       const cards = await Card.findAll({where:{id:id}});
        if(cards){
               return res.status(200).json(cards);
        }
           return res.status(404).json({message:"Nenhum card encontrado!!!"});
    } catch (error) {
         return res.status(404).json({message:"Nenhum card encontrado!!!"});
    }
   
    
}
async function verCards(req,res) {
    try {
       const cards= await Card.findAll({include: [{ 
                model: Column, 
            }]});
            console.log("Resultado do Banco:", cards); 
        if(cards){
               return res.status(200).json(cards);
        }
           return res.status(404).json({message:"Nenhum card encontrado!!!"});
    } catch (error) {
         return res.status(404).json({message:"Nenhum card encontrado!!!"});
    }
   
    
}
module.exports={
    criacaoCard:criacaoCard,
    atualizarCard:atualizarCard,
   verCardsporID:verCardsporID,
   verCards:verCards,
}