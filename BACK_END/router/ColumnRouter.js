const express =require("express");
const columnController= require("../controller/ColumnControler");
const router =express.Router();

router.post("/",columnController.criaçãoColuna);
router.patch("/:id",columnController.updateColumn);
router.delete("/:id",columnController.deletarColumn);
router.get("/:id",columnController.buscarTodosPorBoard);
module.exports=router;