const express = require('express');

const mongoose = require('mongoose');

const { routes } = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

async function main() {
  try {
    console.log('Try to connected to MongoDB');
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Server has been started! Listen on PORT: ${PORT} `);
  });
}

main();
