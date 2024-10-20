const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Log the DB URL for debugging
console.log("MongoDB URL:", process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected Successfully!");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});


