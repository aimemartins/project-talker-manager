function validateEmail(req, res, next) {
  const { email } = req.body;

    if (email === undefined) {
      return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
    }
    const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!REGEX_EMAIL.test(email)) {
      return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
   return next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (password === undefined) {
    return res
    .status(400)
    .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 5) {
    return res
    .status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
 return next();
}

module.exports = { validateEmail, validatePassword };