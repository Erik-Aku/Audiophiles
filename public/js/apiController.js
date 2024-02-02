let querySubmit = document.querySelector("#querySubmitButton");
const queryInput = document.querySelector("#queryInputField");
let queryText;
let url;
let likeArry = [];

queryInput.addEventListener("input", function () {
  queryText = queryInput.value;
  url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${queryText}`;
});

async function fetchData() {
  try {
    // const response = await fetch(url, options);
    // call backend route to fetch dezzer api
    const response = await fetch("/api/fetchApi", {
      method: "POST",
      body: JSON.stringify({url}),
      headers: { "Content-Type": "application/json" },
    });
    if(!response.ok){
      console.log("Failed to fetch Deezer API");
      return;
    }
    const result = await response.json();
    // console.log(result.data);

    songData(result.data);
  } catch (error) {
    console.error(error);
  }
}

const cardContainerEl = document.querySelector("#music-container");

const songData = (data) => {
  cardContainerEl.innerHTML = "";
  likeArry = [];

  for (let i = 0; i < data.length; i++) {
    let currentObj = data[i];
    let songName = currentObj.title;
    let artistName = currentObj.artist.name;
    let albumCover = currentObj.album.cover_medium;
    let musicLink = currentObj.link;

    let albumName = currentObj.album.title;
    let requestBody = {
      artist_name: artistName,
      album_name: albumName,
      album_image: albumCover,
      song_name: songName,
      music_link: musicLink,
    };

    const artistCard = document.createElement("div");
    artistCard.classList.add("card", "col-md-4", "mx-2", "mt-3");
    artistCard.setAttribute("style", "width: 18rem;");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = artistName;

    const cardImageLink = document.createElement("a");
    cardImageLink.setAttribute("href", musicLink);
    cardImageLink.setAttribute("target", "_blank");

    const cardImage = document.createElement("img");
    cardImage.classList.add("card-img-top");
    cardImage.setAttribute("src", albumCover);

    const song = document.createElement("p");
    song.classList.add("card-text");
    song.textContent = songName;

    const cardLikeBtn = document.createElement("a");
    cardLikeBtn.classList.add("like-button", "btn", "btn-primary");
    cardLikeBtn.setAttribute("href", "#");
    cardLikeBtn.setAttribute("data-music", i);
    cardLikeBtn.textContent = "Like";
    cardLikeBtn.addEventListener("click", function () {
      likeButtonHandler(cardLikeBtn.dataset.music);
    });

    cardImageLink.appendChild(cardImage);

    cardBody.appendChild(song);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(song);
    cardBody.appendChild(cardImageLink);
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
  const music_link = obj.music_link;

  if (obj) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/music", {
      method: "POST",
      body: JSON.stringify({
        artist_name,
        album_name,
        album_image,
        song_name,
        music_link,
      }),
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
