// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const toDoRoutes = require('./routes/ToDoRoutes');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// // Log the DB URL for debugging
// console.log("MongoDB URL:", process.env.DB_URL);

// app.use(cors());
// app.use(express.json());

// app.use('/api', authRoutes);
// app.use('/api/todo', toDoRoutes);

// mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("DB Connected Successfully!");
//   })
//   .catch((err) => {
//     console.log("DB Connection Error:", err);
//   });

// app.listen(PORT, () => {
//   console.log(`Server started at port ${PORT}`);
// });

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const toDoRoutes = require('./routes/ToDoRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// Log the DB URL for debugging (only in development)
if (!isProduction) {
  console.log("MongoDB URL:", process.env.DB_URL);
}

app.use(cors());
app.use(express.json());

// Root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Welcome to the ToDo App Backend!');
});

// Auth and ToDo routes
app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

// Handle unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected Successfully!");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

