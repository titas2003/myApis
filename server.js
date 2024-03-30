const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');


const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send("Shanu+Smita but shanu boudibaaaz...jomi kere nae...upen er jomir aam kheye nae..Shanu payel k valobase...payel sanjay k valobase...sanjay smita k valobase...smita sobaike valobase...vaja vaja");
})

const mongoURI = 'mongodb+srv://admin:admin@cluster01.j2cmld8.mongodb.net/?retryWrites=true&w=majority&appName=cluster01';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use('/api', userRoutes);


app.listen(port, () => {
    console.log(`Your api root is listening on port: ${port}`)
})