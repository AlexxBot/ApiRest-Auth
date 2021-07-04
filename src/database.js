import mongoose from 'mongoose';
//import env from 'dotenv'

//env.config()//para recuperar las configuraciones

//mongoose.connect("mongodb://mongo/companydb", {
//mongoose.connect("mongodb://localhost/companydb", {
    mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://AlexxBot:<password>@cluster0.5my0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('db is connected', db.connection.host))
    .catch(error => console.log(error)) 