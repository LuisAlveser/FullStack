const express=require("express");
const router=express.Router();
const board_membersController= require("../controller/Board_MembersController");

router.post("/",board_membersController.adicionar_membros);
router.get("/",board_membersController.listadeMembros);
router.delete("/:id",board_membersController.delete_membro);
module.exports=router;