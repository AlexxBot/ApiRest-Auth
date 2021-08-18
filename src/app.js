//const express = require("express");
import express from 'express';
import morgan from 'morgan';
import moduleName from '../package.json'

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetUp';

import { Router } from 'express'
import cors from 'cors'
//import { ieNoOpen } from 'helmet';



const app = express();



createRoles();

app.set('port', process.env.PORT || 3000);
app.set('pkg', moduleName);

//esto es para que entiendo los datos en formato json
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

//esto es para que aparezcan la peticiones en la consola
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    //console.log("welcome to the api");
    //res.json("welcome");
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: moduleName.description,
        version: moduleName.version,
    })
})


const corsOptions = {
    //"origin": "http://localhost:4700",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(corsOptions))

app.use('/products', productsRoutes/* require('./routes/products.routes') */);
app.use('/auth', authRoutes);



/* module.exports = {
    app: app,
    server: server
} */

/* const router = Router()
import webpush from './notification'


app.post('/suscription', (req, res) => {

    console.log(req.body)
    res.status(200).json({texto: 'suscrito'})
}) */

import { sendPushToOneUser, sendPushToTopic } from './notification';


app.get("/one-user", (req, res) => {
    res.send("Sending Notification to One user ...")
    const data = {
        tokenId: "eQThd_44TZuFKyaZ2k5jOB:APA91bHz4HQIVCHEy7l5cA46ZC1bxXpo9eXsCC5vhe3zs5di7KKh-967TI5wp4X-xK4AySwgwnoWHIWZP_Xe2O3xjcYd5FpDjKfTbE3L8Mhot-eGy5cfr4gV6I_RElzrQSCuks0AdesZ:APA91bHz4HQIVCHEy",
        titulo: "AlexxBotNotification",
        mensaje: "Message to one user from nodejs"
    }

    sendPushToOneUser(data)
})

app.get("/topic", (req, res) => {
    res.send("Sending Notification to a Topic ...")
    const data = {
        tokenId: "test",
        titulo: "AlexxBotNotification",
        mensaje: "Message to Topic Test from nodejs"
    }

    sendPushToTopic(data)
})




export default app;



