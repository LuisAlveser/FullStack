const express =require("express");
const userController= require("../controller/UserController");
const router =express.Router();

router.post("/",userController.cadastro);
router.post("/login",userController.login);
router.patch("/atualizar/:id",userController.atualizarUser);
router.delete("/excluir/:id",userController.deleteUser)
module.exports=router;