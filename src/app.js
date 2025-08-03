import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app= express();

app.use(cors);

app.use(express.json({limit:"16kb"}));    //this middleware is used to taking data from forms i.e body

app.use(express.urlencoded({extended:true}))  //this middleware is used to taking data from query i.e url

app.use(express.static())  //this middleware is used to store incoming file folder

app.use(cookieParser());

export default app;