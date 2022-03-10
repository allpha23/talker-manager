const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const {
  validEmail,
  validPassword,
  tokenGenerator,
  validName,
  validAge,
  validDate,
  validRate,
  validTalk,
  validToken,
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

app.get('/talker/search', validToken, async (request, response) => {
  const { searchTerm } = request.query;
  const talkers = await fs.readFile(FILE_NAME);
  const parseTalkers = JSON.parse(talkers);
  const filterTalkers = parseTalkers.filter((talker) => talker.name.includes(searchTerm));
  
  if (!searchTerm) {
    return response.status(200).json(parseTalkers);
  }
  
  if (filterTalkers.length === 0) {
    return response.status(200).json([]);
  }
  
  return response.status(200).json(filterTalkers);
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

app.post('/talker',
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  async (request, response) => {
    const { name, age, talk } = request.body;
    const talkers = await fs.readFile(FILE_NAME);
    const parseTalkers = JSON.parse(talkers);
    const id = parseTalkers.length + 1;
    const newTalker = { id, name, age, talk };
    parseTalkers.push(newTalker);
    fs.writeFile(FILE_NAME, JSON.stringify(parseTalkers));
    return response.status(201).json(newTalker);
});

app.put('/talker/:id',
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
  async (request, response) => {
    const { name, age, talk } = request.body;
    const talkers = await fs.readFile(FILE_NAME);
    const parseTalkers = JSON.parse(talkers);
    const id = Number(request.params.id);
    parseTalkers.filter((talker) => talker.id !== id);
    const newTalker = { id, name, age, talk };
    parseTalkers.push(newTalker);
    fs.writeFile(FILE_NAME, JSON.stringify(parseTalkers));
    return response.status(200).json(newTalker);
});

app.delete('/talker/:id', validToken, async (request, response) => {
  const { id } = request.params;
  const talkers = await fs.readFile(FILE_NAME);
  const parseTalkers = JSON.parse(talkers);
  const deletedTalker = parseTalkers.filter((talker) => talker.id !== Number(id));
  fs.writeFile(FILE_NAME, JSON.stringify(deletedTalker));
  return response.status(204).json();
});
