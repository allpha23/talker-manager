const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const {
  validEmail,
  validPassword,
  tokenGenerator,
} = require('./middlewares');

const FILE_NAME = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (request, response) => {
  const talkers = await fs.readFile(FILE_NAME);
  const parseTalkers = JSON.parse(talkers);
  return response.status(200).json(parseTalkers);
});

app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile(FILE_NAME);
  const parseTalkers = JSON.parse(talkers);
  const talkerId = parseTalkers.find((talker) => talker.id === Number(id));

  if (talkerId) {
    return response.status(200).json(talkerId);
  }

  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validEmail, validPassword, tokenGenerator);