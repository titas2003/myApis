const otpGenerator = require('otp-generator');
const User = require('../model/User');

// Endpoint to request OTP
async function requestOTP(req, res) {
  const { phone } = req.body;

  try {
    // Find user by phone number
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

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
async function verifyOTP(req, res) {
  const { phone, otp } = req.body;

  try {
    // Find user by phone number
    const user = await User.findOne({ phone });
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

module.exports = { requestOTP, verifyOTP };
