const express=require("express");
const app=express();
app.use(express.json());
const userRouter= require("./router/UserRouter");
const boardRouter=require("./router/BoardRouter");
const columnRouter=require("./router/ColumnRouter");
const cardRouter=require("./router/CardRouter");
const board_membersRouter=require("./router/Board_MembersRouter")
app.listen(3001,()=>{
   console.log("Funcionando"); 
});

app.use("/user",userRouter);
app.use("/board",boardRouter);
app.use("/column",columnRouter);
app.use("/card",cardRouter);
app.use("/board_members",board_membersRouter);