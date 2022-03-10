module.exports = (request, response, next) => {
  const { email } = request.body;
  const regex = /\S+@\S+\.\S+/;
  const emailTest = regex.test(email);
  
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailTest) {
    return response.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  
  next();
};
