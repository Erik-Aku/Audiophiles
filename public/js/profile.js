/*
const showProfileBtn = document.querySelector(".show-profile-btn");

async function showProfileHandler(event) {
  event.preventDefault();

showProfileBtn.addEventListener("click", showProfileHandler);
*/
const classUserProfile = document.querySelector(".user-profile");
const classUserName = document.querySelector(".user-name");
const classUserEmail = document.querySelector(".user-email");
const classUserMusiclist = document.querySelector(".user-musiclist");
const userFollowinglist = document.querySelector(".user-following-list");
const followBtn = document.querySelector(".follow-btn");

const fetchProfileData = async function () {
  try {
    const getUserProfile = await fetch(`/api/users/currentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (getUserProfile.ok) {
      const userData = await getUserProfile.json();
      console.log("user data: ");
      console.log(userData);

      const userName = document.createElement("span");
      const userEmail = document.createElement("span");

      userName.textContent = " " + userData.currentUser_name;
      userEmail.textContent = " " + userData.currentUser_email;

      classUserName.appendChild(userName);
      classUserEmail.appendChild(userEmail);

      const userMusicData = userData.currentUser_hasMusic;

      const userfollowData = userData.currnetUser_hasFriend;

      const MusicContainer = document.querySelector("#music-container");
      // check for array.length for condition
      if (userMusicData !== undefined && userMusicData !== null) {
        for (i = 0; i < userMusicData.length; i++) {
          const artistCard = document.createElement("div");
          artistCard.classList.add("card", "col-md-4", "mx-2", "mt-3");
          artistCard.setAttribute("style", "width: 18rem;");

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const cardTitle = document.createElement("h5");
          cardTitle.classList.add("card-title");
          cardTitle.textContent = userMusicData[i].artist_name;

          const cardImageLink = document.createElement("a");
          cardImageLink.setAttribute("target", "_blank");
          cardImageLink.setAttribute("href", userMusicData[i].music_link);

          const cardImage = document.createElement("img");
          cardImage.classList.add("card-img-top");
          cardImage.setAttribute("src", userMusicData[i].album_image);

          const song = document.createElement("p");
          song.classList.add("card-text");
          song.setAttribute("style", "margin-bottom: 0px;");
          song.textContent = userMusicData[i].song_name;

          const albumName = document.createElement("p");
          albumName.classList.add("card-text");
          albumName.textContent = `Album Name: ${userMusicData[i].album_name}`;

          cardImageLink.appendChild(cardImage);

          cardBody.appendChild(cardTitle);
          cardBody.appendChild(song);
          cardBody.appendChild(albumName);
          cardBody.appendChild(cardImageLink);
          artistCard.appendChild(cardBody);
          MusicContainer.appendChild(artistCard);

          classUserMusiclist.appendChild(MusicContainer);
        }
      }

      if (userfollowData !== undefined && userfollowData !== null) {
        for (i = 0; i < userFriendData.length; i++) {
          const followInfoContainer = document.createElement("div");
          const followName = document.createElement("div");
          const followEmail = document.createElement("div");

          const followMusicContainer = document.createElement("div");
          const followMusicID = document.createElement("div");
          const followMusicArtist = document.createElement("div");
          const followMusicAlbumName = document.createElement("div");
          const followMusicSongName = document.createElement("div");

          followName.textContent = `Name: ${userfollowData.name}`;
          followEmail.textContent = `Email: ${userFollowinglist.email}`;
          followMusicID.textContent = `${i}`;
          followMusicArtist.textContent = `Artist Name: ${userfollowData.music.artist_name}`;
          followMusicAlbumName.textContent = `Album Name: ${userfollowData.music.album_name}`;
          followMusicSongName.textContent = `Song Name: ${userfollowData.music.song_name}`;

          followMusicContainer.appendChild(followMusicID);
          followMusicContainer.appendChild(followMusicArtist);
          followMusicContainer.appendChild(followMusicAlbumName);
          followMusicContainer.appendChild(followMusicSongName);

          followInfoContainer.appendChild(followName);
          followInfoContainer.appendChild(followEmail);
          followInfoContainer.appendChild(followMusicContainer);

          userFollowinglist.appendChild(followInfoContainer);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

fetchProfileData();

async function searchFriendhandler(event) {
  event.preventDefault();
  try {
    const getAllUserData = await fetch(`/api/users/findall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(getAllUserData)
    const friendData = await getAllUserData.json();
    console.log(friendData);
  } catch (error) {
    console.log(error);
  }
}

followBtn.addEventListener("click", searchFriendhandler);

// return an random non repeating index in an interval (from 0 to array.length) passed to this func
/*
function RandomIndex(arrayLength) {
  // Create an array of all possible indices
  const indices = Array.from({ length: arrayLength }, (_, i) => i);

  // Shuffle the array using the Fisher-Yates shuffle algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  // Select and remove the first index from the shuffled array
  const randomIndex = indices.shift();
  return randomIndex;
}
// Example usage
const array = [10, 20, 30, 40, 50];
const randomItem = array[RandomIndex(array.length)];
console.log(randomItem);
*/