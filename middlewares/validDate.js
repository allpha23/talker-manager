module.exports = (request, response, next) => {
  const { talk } = request.body;
  const regex = /([0-9]{2})\/([0-9]{2})\/([0-9]{4})/;
  
  if (!talk.watchedAt || talk.watchedAt === '') {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  
  if (!regex.test(talk.watchedAt)) {
    return response.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  
  next();
};