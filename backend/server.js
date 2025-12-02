import express from "express";
import connectDb from './config/db.js'
import dotenv from 'dotenv'

const app = express();

dotenv.config()

let port = process.env.PORT;

connectDb()

// app.method(path , handler)

// http://localhost:3000/

app.get('/' , (req,res)=>{
    res.send('hello world')
})

app.listen(port, () => console.log("server started"));



