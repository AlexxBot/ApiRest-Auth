
import app from './app'
//const { app } = require('./app');


import './database';


app.listen(app.get('port'), () => {
    console.log('Server listen on port', 3000);
    }
);