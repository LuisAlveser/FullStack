const express =require("express");
const cardController= require("../controller/CardControler");
const { route } = require("./ColumnRouter");
const router =express.Router();

router.post("/",cardController.criacaoCard);
router.patch("/:id",cardController.atualizarCard);
router.get("/:id",cardController.verCardsporID);
router.get("/",cardController.verCards);
module.exports=router;