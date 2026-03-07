import express from 'express'
import dotenv from 'dotenv'
import path from "path"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 THIS IS THE IMPORTANT LINE
const rootDir = path.resolve();

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(rootDir,"frontend","dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(rootDir,"frontend","dist","index.html"));
    });
}
console.log("NODE_ENV:", process.env.NODE_ENV);

app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`))