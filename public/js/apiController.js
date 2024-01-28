
let querySubmit = document.querySelector('#querySubmitButton');
const queryInput = document.querySelector('#queryInputField');
let queryText;
let url;

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
    // console.log(result.data.map((song) => console.log(song.title)))
    console.log(result.data)
    songData(result.data);
  } catch (error) {
    console.error(error);
  }
}

const cardContainerEl = document.querySelector('#music-container');

const songData = (data) => {
  cardContainerEl.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    let currentObj = data[i];
    let songName = currentObj.title;
    let artistName = currentObj.artist.name;
    let albumCover = currentObj.album.cover_medium;
    
    
    const artistCard = document.createElement('div');
    artistCard.classList.add("card", "col-md-4", "mx-2", "mt-3");
    artistCard.setAttribute('style', "width: 18rem;")

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = artistName;

    const cardImage = document.createElement('img');
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute('src', albumCover,);

   const song = document.createElement('p');
   song.classList.add('card-text');
   song.textContent = songName;

   const cardLikeBtn = document.createElement('a');
   cardLikeBtn.classList.add('btn', 'btn-primary');
   cardLikeBtn.setAttribute('href', "#");
   cardLikeBtn.textContent = "Like";

    cardBody.appendChild(song)
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(song)
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardLikeBtn);
    artistCard.appendChild(cardBody);
    cardContainerEl.appendChild(artistCard)
  }

}


querySubmit.addEventListener('click', () => fetchData())
