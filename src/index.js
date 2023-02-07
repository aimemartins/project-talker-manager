const express = require('express'); // framework pra ajudar a construir a aplicação
const { getAllTalkers, getId, handleToken } = require('./handleTalkers');
const { validateEmail, validatePassword } = require('./middlewares/validateToken');

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
    console.log(talkers);
    res.status(200).json(talkers);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

// Requisito 3

app.post('/login', validatePassword, validateEmail, async (req, res) => {
  const { email, password } = req.body;
  const token = handleToken(email, password);
  
    return res.status(200).json({ token });
});
