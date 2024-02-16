const mongoose=require("mongoose")

const conncetDb=async ()=>{
    await mongoose.connect("mongodb+srv://akshayrp:root@cluster.ar9cvdc.mongodb.net/")
    console.log("Database Connceted");
}

module.exports=conncetDb