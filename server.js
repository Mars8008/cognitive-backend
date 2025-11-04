const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');  // Routes файлыг оруулна
const resultRoutes = require('./routes/resultRoutes')
const dailyRoutes = require('./routes/dailyRoutes')
const baselineRoutes = require('./routes/baselineRoutes');
const dailyHabitRoutes = require('./routes/dailyHabitRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB холболт
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB холболтын алдаа:', err));

// Routes
app.use('/api/baselines', baselineRoutes);
app.use('/api/users', userRoutes);  // Хэрэглэгчийн маршрутыг холбох
app.use('/api/result', resultRoutes)
app.use('/api/daily', dailyRoutes)
app.use('/api/habits', dailyHabitRoutes);

// Серверийг сонсох
app.listen(port, () => {
  console.log(`Server is running ${port} port`);
});


