const express =require("express");
const boardController= require("../controller/BoardController");
const router =express.Router();

router.post("/",boardController.adicionarQuadro);
router.get("/:id",boardController.buscaQuadrosPorUser);
router.patch("/:id",boardController.atualizarQuadro);
router.delete("/:id",boardController.deleteQuadro);
module.exports=router;