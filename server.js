const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const newProduct = require('./routes/ProductRoutes');
const { requestOTP, verifyOTP } = require('./routes/Otplogin');


const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send("Thank you for reaching us");
})

const mongoURI = 'mongodb+srv://admin:admin@cluster01.j2cmld8.mongodb.net/?retryWrites=true&w=majority&appName=cluster01';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', newProduct);
app.post('/request-otp', requestOTP);
app.post('/verify-otp', verifyOTP);


app.listen(port, () => {
    console.log(`Your api root is listening on port: ${port}`)
})
