let querySubmit = document.querySelector("#querySubmitButton");
const queryInput = document.querySelector("#queryInputField");
let queryText;
let url;
let likeArry = [];

queryInput.addEventListener("input", function () {
  queryText = queryInput.value;
  url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${queryText}`;
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "d234ba8234msh21b763e119aeb38p18fabdjsnd2b69705b260",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.data);

    songData(result.data);
  } catch (error) {
    console.error(error);
  }
}

const cardContainerEl = document.querySelector("#music-container");

const songData = (data) => {
  for (let i = 0; i < data.length; i++) {
    let currentObj = data[i];
    let songName = currentObj.title;
    let artistName = currentObj.artist.name;
    let albumCover = currentObj.album.cover_medium;
    let albumName = currentObj.album.title;
    let requestBody = {
      artist_name: artistName,
      album_name: albumName,
      album_image: albumCover,
      song_name: songName,
    };

    const artistCard = document.createElement("div");
    artistCard.classList.add("card");
    artistCard.setAttribute("style", "width: 18rem;");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = artistName;

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("src", albumCover);

    const song = document.createElement("p");
    song.classList.add("card-text");
    song.textContent = songName;

    const cardLikeBtn = document.createElement("a");
    cardLikeBtn.classList.add("like-button");
    cardLikeBtn.setAttribute("href", "#");
    cardLikeBtn.setAttribute("data-music", i);
    cardLikeBtn.textContent = "Like";
    cardLikeBtn.addEventListener("click", function () {
      likeButtonHandler(cardLikeBtn.dataset.music);
    });

    cardBody.appendChild(song);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(song);
    cardBody.appendChild(cardImage);
    cardBody.appendChild(cardLikeBtn);
    artistCard.appendChild(cardBody);
    cardContainerEl.appendChild(artistCard);

    likeArry.push(requestBody);
  }
};

const likeButtonHandler = async (id) => {
  const obj = likeArry[id];

  const artist_name = obj.artist_name;
  const album_name = obj.album_name;
  const album_image = obj.album_image;
  const song_name = obj.song_name;

  if (obj) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/music", {
      method: "POST",
      body: JSON.stringify({ artist_name, album_name, album_image, song_name }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Successfully added this song to your music list");
      //  document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

querySubmit.addEventListener("click", () => fetchData());

// click on like button and save the music data in array
// add event listener to call a function that fetches the api route
// with the post request and sends the music data along with that request
