module.exports = (request, response) => {
    let token = '';
    do {
      token += Math.random().toString(36).substring(2);
    } while (token.length < 16);
    token = token.substring(0, 16);
    return response.status(200).json({ token });
};