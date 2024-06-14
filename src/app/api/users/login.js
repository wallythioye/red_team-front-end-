// Récupérer le token stocké
const token = localStorage.getItem('token');
// Ou récupération depuis un cookie
// const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];

// Inclure le token dans les en-têtes des requêtes HTTP
const requestOptions = {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

// Utiliser requestOptions pour effectuer la requête HTTP avec le token inclus
fetch('/votre/api/route', requestOptions)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));
