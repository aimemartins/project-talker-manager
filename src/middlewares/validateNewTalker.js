async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || authorization.length !== 16) {
    return res
    .status(401)
    .json({ message: 'Token não encontrado' });
  }
  // console.log(authorization);
  next();
}

module.exports = { auth };