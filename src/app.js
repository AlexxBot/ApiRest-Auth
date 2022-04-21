//const express = require("express");
import express from 'express';
import morgan from 'morgan';
import moduleName from '../package.json'

import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import { createRoles } from './libs/initialSetUp';

import cors from 'cors'
//import { ieNoOpen } from 'helmet';

import env from 'dotenv'//it should be setted in a config file which must be declare al the .env variables

env.config()

const app = express();

createRoles();

app.set('port', process.env.PORT || 3000);
app.set('pkg', moduleName);

//esto es para que entiendo los datos en formato json
app.use(express.json());

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
app.use('/auth', authRoutes );



/* module.exports = {
    app: app,
    server: server
} */
export default app;



