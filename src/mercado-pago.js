import app from './app'
import mercadopago from 'mercadopago'
import env from 'dotenv'

env.config()

mercadopago.configure({
    //access_token: 'APP_USR-6610235238271760-070117-08005b586889996547475cd4059066bf-784256994'
    access_token: process.env.MP_TOKEN
  });

app.post('/api/order', (req, res) => {
    const { userId, productId, name, price, quantity } = req.body

    console.log('este es el json del adjuntado : ', req.body)
    let preference = {
        items: [
            {
                title: name,
                unit_price: price,
                quantity: quantity
            }           
        ]
    }
    mercadopago.preferences.create(preference)
    .then((response) => {
        res.json({ preferenceId: response.body.id})
    }).catch((error) => {
        console.log(error);
    })
});