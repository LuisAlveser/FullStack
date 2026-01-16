const express=require("express");
const app=express();
app.use(express.json());
const userRouter= require("./router/UserRouter");
const boardRouter=require("./router/BoardRouter");
app.listen(3001,()=>{
   console.log("Funcionando"); 
});

app.use("/user",userRouter);
app.use("/board",boardRouter);