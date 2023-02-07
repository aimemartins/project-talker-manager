async function auth(req, res, next) {
  const { authorization } = req.headers;
  // console.log('body', req.body);

  if (!authorization) {
    return res
    .status(401)
    .json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16 && (typeof authorization) === 'string') {
    return res
    .status(401)
    .json({ message: 'Token inválido' });
  }
  // console.log(authorization);
  next();
}

async function validateName(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res
    .status(400)
    .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
    .status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

async function validateAge(req, res, next) {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
  }

  if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

module.exports = { 
  auth, 
  validateName, 
  validateAge,
};