require('dotenv').config();
const subscriptionRoutes = require('./Route/subscriptionRoutes');
const userRoutes = require('./Route/userRoutes');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use("/users", userRoutes);
app.use('/dashboard', subscriptionRoutes);

const PORT = process.env.PORT;
app.listen(PORT);