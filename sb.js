const nodemailer = require('nodemailer')

// function sendEmail(email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "kaisarfirjatullah@gmail.com",
            pass: "chldzhbdokspsfez"
        },
        debug: true,
        logger: true
    })

    let details = {
        from: "aisarfirjatullah@gmail.com",
        to: "kaisar.10rpl2.2019@gmail.com",
        subject: "tes tes bosss",
        text: "tesss masukkkk"
    }

    transporter.sendMail(details, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('KEKIRIM!!!');
        }
    })
// }
// const nodemailer = require('nodemailer');

// function sendEmail(email) {

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.email",
//         port: 465,
//         service: "gmail",
//         secure: true,
//         auth: {
//             user: "tweetwar2022@gmail.com",
//             pass: "eqobxeywsphedxyc"
//         },
//         debug: true,
//         logger: true
//     });

//     const option = {
//         from: "tweetwar2022@gmail.com",
//         to: "kaisarfirjatullah@gmail.com",
//         subject: "Acount Success Create",
//         text: "Your Account has been create",
//         html: "<b>Your Account has been create</b>"
//     };

//     return new Promise((resolve, reject) => {
//         transporter.sendMail(option, (err, info) => {
//             if (err) {
//                 console.log(err);
//                 reject(err)
//             }
//             resolve('success')
//             console.log("sent: " + info);
//         })
//     })
// // }

// module.exports = sendEmail