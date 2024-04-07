const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: 'nomail02024@gmail.com', // Your email address
        pass: 'rkkr oshm xaun cawk' // Your email password
    }
});

module.exports = transporter;
