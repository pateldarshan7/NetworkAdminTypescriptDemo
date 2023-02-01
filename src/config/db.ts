import dotenv from "dotenv";
dotenv.config();

const DB = process.env.DB!;
const PORT = parseInt(process.env.PORT!);
const JWT_KEY = process.env.JWT_KEY!;

export { DB, PORT, JWT_KEY };

/* const connect = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost/Exam1');
        console.log("MongoDB Connected Successfully");
    }
    catch(error){
        console.log("Error connecting to MongoDB",error);
    }
} */

/* export = connect; */
