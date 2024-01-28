
const querySubmit = document.querySelector('#querySubmitButton')
const queryInput = document.querySelector('#queryInputField')
let queryText
let url

queryInput.addEventListener('input', function() {
  queryText = queryInput.value
   url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${queryText}`;
});

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
    const result = await response.json();
    //console.log(await result.data.map((song) => (song.title)))
    console.log(result.data)
  } catch (error) {
    console.error(error);
  }
}

querySubmit.addEventListener('click', () => fetchData())
