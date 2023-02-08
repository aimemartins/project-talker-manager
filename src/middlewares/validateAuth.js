async function validateAuth(req, res, next) {
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

module.exports = validateAuth;