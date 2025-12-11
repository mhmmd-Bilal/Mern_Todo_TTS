import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import todoRoute from "./routes/todoRoutes.js";

const app = express();

dotenv.config();

let port = process.env.PORT;

connectDb();

app.use(express.json()); // parses JSON body sent from frontend/postman - data will be available in req.body
app.use(express.urlencoded({extended : true}))  // used to parse form data (HTML form submission) - data will be available in req.body

// app.method(path , handler)

// http://localhost:3000/api/todo

app.use('/api/todo' , todoRoute)


app.listen(port, () => console.log("server started"));

// Request -> Global Middlewares -> Route Middlewares -> Route handler -> Response