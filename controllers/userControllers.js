const User = require('../models/userModules');

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     return res.status(200).send(users);
//   } catch (err) {
//     return res.status(500).send({
//       message: 'Упс! Произошла ошибка!',
//     });
//   }
// };

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Упс! Произошла ошибка!' }));
};

// eslint-disable-next-line consistent-return
const getUserById = async (req, res) => {
  try {
    const userId = await User.findById(req.params.userId);
    if (!userId) {
      res.status(404).send({ message: 'Нет такого пользователя' });
    }
    res.status(200).send({ data: userId });
  } catch (err) {
    res.status(500).send({
      message: 'Упс! Произошла ошибка!',
    });
  }
};

module.exports = { getUsers, getUserById };

// exports.createUser = async (req, res) => {
//   const { name, about, avatar } = req.body;

//   const user = await User.create({ name, about, avatar });
// };
