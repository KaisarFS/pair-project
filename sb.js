var nodemailer = require('nodemailer')

console.log(nodemailer, '>============');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 465,
    service: "gmail",
    secure: true,
    auth: {
        user: "adrianlie068@gmail.com",
        pass: "JKT48Terbaek"
    },
    debug: true,
    logger: true
})

let details = {
    from: "adrianlie068@gmail.com",
    to: "kaisarfirjatullah@gmail.com",
    subject: "tes tes bosss",
    text: "tesss anjgggg"
}

transporter.sendMail(details, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('KEKIRIM!!!');
    }
})