async function validateTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) { 
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }

  const REGEX_DATE = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

  if (!REGEX_DATE.test(talk.watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
  }

  next();
}

module.exports = validateTalk;
