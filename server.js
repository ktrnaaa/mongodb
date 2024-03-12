import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import Question from './models/question.js';
import Answer from './models/answer.js';

const app = express();
app.use(express.json());

const MONGODB_URI = 'mongodb://localhost:27017/project';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Підключено до бази даних');
  })
  .catch(err => {
    console.error('Помилка підключення до бази даних:', err);
  });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.ejs'));
});

app.get('/random-question', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomQuestion = await Question.findOne().skip(randomIndex);
    res.json(randomQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка сервера');
  }
});

app.post('/save-response', async (req, res) => {
  try {
    const { response, id } = req.body;
    const answer = new Answer({ questionId: id, response: response });
    await answer.save();
    res.send('Відповідь успішно збережена');
  } catch (error) {
    console.error(error);
    res.status(500).send('Помилка сервера');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
