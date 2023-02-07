function validateEmail(email, res) {
    if (email === undefined) {
      return res
      .status(400)
      .json({ message: 'O campo "email" é obrigatório' });
    }
    
    const REGEX_EMAIL = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (!REGEX_EMAIL.test(email)) {
      return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    return null;
}

function validatePassword(password, res) {
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
  return null;
}

async function validateToken(req, res, next) {
  const { email, password } = req.body;

  const ve = validateEmail(email, res);
  if (ve !== null) return ve;

  const vp = validatePassword(password, res);
  if (vp !== null) return vp;

  next();
}

module.exports = { validateToken };