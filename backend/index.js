// const connectToMongo = require('./db');

// connectToMongo();

const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json())


app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/inotebook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//Available Routes

// app.get('/', (req, res) => {
//   res.send('Hello, Bunny!');
// });
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(PORT, () => {
  console.log(`iNotebook running on port ${PORT}`);
});


