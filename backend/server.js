const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbconfig');
const destRoutes = require('./routes/fetchDestinations');
const app = express();

require('dotenv').config();
connectDB(); // Function call to connect DB

app.use(cors());
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api', destRoutes); 

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
