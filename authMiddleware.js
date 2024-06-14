// Middleware d'authentification pour vérifier le token JWT inclus dans les en-têtes des requêtes HTTP
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  try {
    const decodedToken = jwt.verify(token, '0fb2621729063c919d0cef8818822cb89d7fe185b94b55d3caf7ce975d70f36a189476d07ac5a62c309da651fcd0a87466e1019cc294739a61057f208dbf5414');
    req.user = decodedToken; // Stocker les informations de l'utilisateur extraites du token dans l'objet req
    next(); // Passer au middleware suivant ou à la route finale
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export { authMiddleware };
