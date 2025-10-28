import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: function(origin, callback) {
        
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.CORS_ORIGIN,
            'http://localhost:5173',
            'http://localhost:5174',
            'https://blogify-pzaq.vercel.app'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}))

app.use(express.json())
app.use(express.urlencoded({extended: true , limit: "5mb"}))
app.use(express.static("public"))
app.use(cookieParser()) 



import routes from "./src/routes/index.routes.js";

app.use("/api/v1", routes)


 
export {app}