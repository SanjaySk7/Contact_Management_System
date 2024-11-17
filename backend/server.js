const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const eventRouter = require('./routes/eventRoute');

dotenv.config();

const app = express();

app.use(express.json()); 

app.use(cors({
  origin: 'http://localhost:3000',
}));

mongoose.connect('mongodb+srv://sanjaysubramaniyam2002:contact123@cluster0.04dy9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/', eventRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
