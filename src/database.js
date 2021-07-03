import mongoose from 'mongoose';

//mongoose.connect("mongodb://mongo/companydb", {
//mongoose.connect("mongodb://localhost/companydb", {
    mongoose.connect("mongodb+srv://AlexxBot:Dotacinema2@cluster0.5my0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('db is connected', db.connection.host))
    .catch(error => console.log(error)) 