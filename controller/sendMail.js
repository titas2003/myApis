const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../model/User");

const sendMail = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();
    //Connectwith SMTP Etherial
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // port: 587,
        // auth: {
        //     user: 'yasmine.jones70@ethereal.email',
        //     pass: 'dJhPrNVwhrmgTZ4wEt'
        // }
        auth: {
            user: 'nomail02024@gmail.com',
            pass: 'rkkr oshm xaun cawk'
        }
    });

    let info = await transporter.sendMail({
        from: '"Titas Majumder 👻" <titas@gmail.com>', // sender address
        to: "titas20031996@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);

    res.json(info);
}

module.exports = sendMail;