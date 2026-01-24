import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {

        await mongoose.connect(process.env.MONGO_URL);

        console.log("MONGODB IS CONNECTED SUCCSSFULLY !! ");
        
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default ConnectDB;