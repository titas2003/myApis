const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');

router.post('/register', async (req, res) => {
    const { username, email, phone, password } = req.body;
    const clientIP = req.ip;

    if (!username || !email || !phone || !password) {
        return res.status(400).json({ error: 'Please provide data' })
    }
    try {
        const existignUser = await User.findOne({ $or: [{ username }, { phone }] });
        if (existignUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString().substr(-2);
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const timestamp = `${year}${month}${day} ${hours}:${minutes}:${seconds}`;
        console.log(timestamp, ": user", username, " Registered, from ",clientIP)
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }

})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please send your identity' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'You are not registered yet!!' });
        }

        const passwordWatch = await bcrypt.compare(password, user.password);

        if (passwordWatch) {
            return res.json({ message: 'Login Successfull' });
        }
        else {
            return res.json({ message: 'Incorrect Password' });
        }
    } catch (error) {
        console.log('Error logging in:', error);
        res.status(500).json({ error: 'error logging in' });
    }
})

module.exports = router;