const express =require("express");
const boardController= require("../controller/BoardController");
const router =express.Router();

router.post("/",boardController.adicionarQuadro);
router.get("/iniciados/:id",boardController.buscaQuadrosIniciadosPorUser);
router.get("/em_execucao/:id",boardController.buscaQuadrosEm_ExucucaoPorUser);
router.get("/terminado/:id",boardController.buscaQuadrosTerminadosPorUser);
router.patch("/:id",boardController.atualizarQuadro);
router.delete("/:id",boardController.deleteQuadro);
module.exports=router;