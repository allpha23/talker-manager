const validEmail = (request, response, next) => {
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

const validPassword = (request, response, next) => {
  const { password } = request.body;

  if (!password) {
    return response.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (password.length < 6) {
    return response.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }

  next();
};

const tokenGenerator = (request, response) => {
    let token = '';
    do {
      token += Math.random().toString(36).substring(2);
    } while (token.length < 16);
    token = token.substring(0, 16);
    return response.status(200).json({ token });
};

module.exports = { validEmail, validPassword, tokenGenerator };