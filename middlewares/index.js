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

const validName = (request, response, next) => {
  const { name } = request.body;

  if (!name) {
    return response.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return response.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const validAge = (request, response, next) => {
  const { age } = request.body;
  
    if (!age) {
      return response.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
    }
    if (age < 18) {
      return response.status(400).json({
          message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  
  next();
};

const validTalk = (request, response, next) => {
  const { talk } = request.body;
    
  if (!talk) {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
    
  next();
};

const validDate = (request, response, next) => {
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

const validRate = (request, response, next) => {
  const { talk } = request.body;

  if (!talk.rate || talk.rate === '') {
    return response.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  if (talk.rate < 1 || talk.rate > 5) {
    return response.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }

  next();
};

const validToken = (request, response, next) => {
  const { authorization } = request.headers;
  
  if (!authorization) {
    return response.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return response.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};

module.exports = {
  validEmail,
  validPassword,
  tokenGenerator,
  validName,
  validAge,
  validDate,
  validRate,
  validTalk,
  validToken,
};