const express=require("express")

const connectDb=require("./db")

const app=express();

app.use(express.json())

app.use("/api/auth", require("./Auth/Route"))

const server= app.listen(5000,()=>{
    console.log("Server Connceted On",5000);
})


process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })


connectDb();