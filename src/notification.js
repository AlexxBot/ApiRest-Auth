//estoy sera para push notificatin sin firebase , con service workers

/* const webpush = require('web-push')

import env from 'dotenv'

env.config()

webpush.setVapidDetails(
    'mailto:alex_96_sf17@hotmail.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

export default webpush
 */

var admin = require("firebase-admin");

function initFirebase() {
    var serviceAccount = require("./keys/notification-1d1b3-firebase-adminsdk-plhv1-abd7256694.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
        //databaseURL: "https://sample-project-e1a84.firebaseio.com"
        //aqui se puede poner la opcion de database
    });
}

initFirebase();

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

function sendPushToOneUser(notification) {
    /* const message = {
        //token: notification.tokeId,
        data: {
            titulo: notification.titulo,
            mensaje: notification.mensaje
        }
    } */

    const message = {

        "notification": {
            "title": "FCM desde api",
            "body": "messaging tutorial desde api"
        },
        "data": {
            "msgId": "msg_12342"
        }
    }

    const registrationToken = "eQThd_44TZuFKyaZ2k5jOB:APA91bHz4HQIVCHEy7l5cA46ZC1bxXpo9eXsCC5vhe3zs5di7KKh-967TI5wp4X-xK4AySwgwnoWHIWZP_Xe2O3xjcYd5FpDjKfTbE3L8Mhot-eGy5cfr4gV6I_RElzrQSCuks0AdesZ"
    //const message = req.body.message
    const options = notification_options

    //sendMessage(message)
    admin.messaging().sendToDevice(registrationToken, message, options)
        .then(response => {
            console.log('esta es la respuesta despues de llamar a one-user route: ',response)
            //res.status(200).send("Notification sent successfully")

        })
        .catch(error => {
            console.log(error);
        });
}

function sendPushToTopic(notification) {

    const message = {

        "notification": {
            "title": "FCM desde api",
            "body": "messaging tutorial desde api"
        },
        "data": {
            "msgId": "msg_12342"
        }
    }

    //const registrationToken = "eQThd_44TZuFKyaZ2k5jOB:APA91bHz4HQIVCHEy7l5cA46ZC1bxXpo9eXsCC5vhe3zs5di7KKh-967TI5wp4X-xK4AySwgwnoWHIWZP_Xe2O3xjcYd5FpDjKfTbE3L8Mhot-eGy5cfr4gV6I_RElzrQSCuks0AdesZ"
    //const message = req.body.message
    const options = notification_options

    //sendMessage(message)
    admin.messaging().sendToTopic('topic', message, options)
        .then(response => {
            console.log('esta es la respuesta despues de llamar a topic route: ',response)
            //res.status(200).send("Notification sent successfully")

        })
        .catch(error => {
            console.log(error);
        });

    /* const message = {
        topic: notification.topic,
        data: {
            titulo: notification.titulo,
            mensaje: notification.mensaje
        }
    }

    sendMessage(message) */

    
}

function sendMessage(message) {
    admin.messaging().send(message)
        .then((response) => {
            console.log('successfully sent message', response)
        })
        .catch((error) => {
            console.log('error sendind message', error)
        })
}

module.exports = {
    sendPushToOneUser,
    sendPushToTopic,
}