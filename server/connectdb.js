const mongoose=require('mongoose')
const connectToMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
        console.log("Error connecting to MongoDB")
    }
}

module.exports={connectToMongoDb}
