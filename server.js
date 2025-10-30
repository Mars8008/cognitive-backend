const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');  // Routes файлыг оруулна
const resultRoutes = require('./routes/resultRoutes')


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB холболт
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB холбогдсон'))
  .catch(err => console.log('MongoDB холболтын алдаа:', err));

// Routes
app.use('/users', userRoutes);  // Хэрэглэгчийн маршрутыг холбох
app.use('/result', resultRoutes)

// Серверийг сонсох
app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна`);
});


