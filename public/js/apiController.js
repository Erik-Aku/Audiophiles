const axios = require('axios');
//const server = require('server.js');

const rapidApiKey = 'd234ba8234msh21b763e119aeb38p18fabdjsnd2b69705b260';
const rapidApiHost = 'deezerdevs-deezer.p.rapidapi.com';

async function searchDeezer(query) {
  try {
    const searchOptions = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: { q: query },
        headers: {
          'X-RapidAPI-Key': rapidApiKey,
          'X-RapidAPI-Host': rapidApiHost,
        }
      };
      fetch(searchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        
      })
      .then(data => {
        searchOptions.textContent = JSON.stringify(data, null, 2);
      })
      
  } catch (error) {
    console.error(error);
    return ();
  }
}

module.exports = {
  searchDeezer
};
