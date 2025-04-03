const express = require('express');
const connectDB = require('./config/dbconfig');

const app = express();

// Call the function to connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
