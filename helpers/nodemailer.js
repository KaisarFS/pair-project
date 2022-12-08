const nodemailer = require('nodemailer')

function sendEmail(email) {
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
        from: "kaisarfirjatullah@gmail.com",
        to: email,
        subject: "Selamat!, Sekarang kamu bisa mulai jualan",
        text: "TES TES TES"
    }

    transporter.sendMail(details, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('KEKIRIM!!!');
        }
    })
}

module.exports = sendEmail