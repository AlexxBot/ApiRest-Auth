import mongoose from 'mongoose';

//mongoose.connect("mongodb://mongo/companydb", {
    mongoose.connect("mongodb://localhost/companydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('db is connected', db.connection.host))
    .catch(error => console.log(error)) 