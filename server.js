require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// this is for connecting to MongoDB. log the error
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// routes
const thoughtRoutes = require('./routes/thoughtRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/thoughts', thoughtRoutes);
app.use('/api/users', userRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


