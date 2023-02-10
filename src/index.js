const express = require('express'); // framework pra ajudar a construir a aplicação
const 
{ getAllTalkers, 
  getId, handleToken, 
  createTalker, editTalker, deleteTalker } = require('./handleTalkers');
const { validateEmail, validatePassword } = require('./middlewares/validateToken');
const validateAuth = require('./middlewares/validateAuth');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateRate = require('./middlewares/validateRate');

const app = express(); // o express por padrão não consegue ler JSON
app.use(express.json()); // possibilidade de conseguir ler JSON

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.listen(PORT, () => {
  console.log('Online');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
    res.status(200).json(talkers);
});

// Requisito 02

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await getId(Number(id));
    // console.log(talkers);
    res.status(200).json(talkers);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

// Requisito 3 e 4

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  const token = handleToken(email, password);
  
    return res.status(200).json({ token });
});

// Requisito 5 

app.post('/talker', validateAuth, validateName, validateAge, validateTalk, validateRate,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  const response = await createTalker(name, age, watchedAt, rate);

    return res.status(201).json(response);
});

// Requisito 6

app.put('/talker/:id', validateAuth, validateName, validateAge, validateTalk, validateRate,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const response = await editTalker(id, name, age, talk);
  
    return res.status(200).json(response);
});

app.delete('/talker/:id', validateAuth, 
  async (req, res) => {
    const { id } = req.params;
    const response = await deleteTalker(id);
    return res.status(204).json(response);
});
