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

// async function validateName(req, res, next) {
//   const { name } = req.body;

// }

module.exports = { auth };