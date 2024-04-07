const otpGenerator = require('otp-generator');
const User = require('../model/User');
const transporter = require('../controller/mailConf');


function generateOTP() {
    // Define the characters to be used for OTP
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
}
// Endpoint to request OTP
async function requestemailOTP(req, res) {
    const { email } = req.body;

    try {
        // Find user by phone number
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = generateOTP();
        // const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false, digits: true });

        // Nodemailer configuration
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail', // Use your email service provider
        //     auth: {
        //         user: 'nomail02024@gmail.com', // Your email address
        //         pass: 'rkkr oshm xaun cawk' // Your email password
        //     }
        // });

        // Email options
        const mailOptions = {
            from: 'nomail02024@gmail.com',
            to: email,
            subject: 'Your One Time Password (OTP)',
            text: `Your OTP is: ${otp}`
        };

        // Sending the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send('Failed to send OTP');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('OTP sent successfully');
            }
        });


        // In a real application, you would send the OTP via SMS or email
        console.log(`Generated OTP for user ${user._id}: ${otp}`);

        // Save OTP to user data
        await User.updateOne({ _id: user._id }, { $set: { otp } });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (err) {
        console.error('Error requesting OTP:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Endpoint to verify OTP
async function verifyemailOTP(req, res) {
    const { email, otp } = req.body;

    try {
        // Find user by phone number
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP matches
        if (otp === user.otp) {
            // Clear OTP after successful verification
            await User.updateOne({ _id: user._id }, { $unset: { otp: '' } });

            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { requestemailOTP, verifyemailOTP };
