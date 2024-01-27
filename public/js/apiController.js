
const searchFormEl = document.querySelector('#test')

const rapidApiKey = 'd234ba8234msh21b763e119aeb38p18fabdjsnd2b69705b260';
const rapidApiHost = 'deezerdevs-deezer.p.rapidapi.com';

const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd234ba8234msh21b763e119aeb38p18fabdjsnd2b69705b260',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Call the fetchData function
fetchData();