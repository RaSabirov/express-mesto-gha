const express = require('express');

const mongoose = require('mongoose');

const { routes } = require('./routes/routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6283597354d120943f1f1f6c', // _id созданного пользователя
  };

  next();
});
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.method, req.path);
  next();
});

app.use(routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Такого пути не существует' });
});

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server has been started! Listen on PORT: ${PORT} `);
  });
}

main();
