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
      console.log("user data: ")
      console.log(userData);

      const userName = document.createElement("span");
      const userEmail = document.createElement("span");

      userName.textContent = " " + userData.currentUser_name;
      userEmail.textContent = " " + userData.currentUser_email;

      classUserName.appendChild(userName);
      classUserEmail.appendChild(userEmail);

      const userMusicData = userData.currentUser_hasMusic;

      const userfollowData = userData.currnetUser_hasFriend;
      // check for array.length for condition
      if (userMusicData !== undefined && userMusicData !== null) {
        for (i = 0; i < userMusicData.length; i++) {
          const MusicContainer = document.createElement("div");
          const artistName = document.createElement("div");
          const albumName = document.createElement("div");
          const albumImage = document.createElement("img");
          const songName = document.createElement("div");


          artistName.textContent = userMusicData[i].artist_name;
          albumName.textContent = userMusicData[i].album_name;
          albumImage.setAttribute("src", userMusicData[i].album_image);
          songName.textContent = userMusicData[i].song_name;


          MusicContainer.appendChild(artistName);
          MusicContainer.appendChild(albumName);
          MusicContainer.appendChild(albumImage);
          MusicContainer.appendChild(songName);

          classUserMusiclist.appendChild(MusicContainer);
        }
      }

      if (userfollowData !== undefined && userfollowData !== null) {
        for (i = 0; i < userFriendData.length; i++) {
          const followInfoContainer =  document.createElement("div");
          const followName = document.createElement("div");
          const followEmail = document.createElement("div");

          const followMusicContainer = document.createElement("div");
          const followMusicID = document.createElement("div");
          const followMusicArtist = document.createElement("div");
          const followMusicAlbumName = document.createElement("div");
          const followMusicSongName = document.createElement("div");

          followName.textContent = `Name: ${userfollowData.name}`;
          followEmail.textContent = `Email: ${userFollowinglist.email}`;
          followMusicID.textContent = `${i}`
          followMusicArtist.textContent = `Artist Name: ${userfollowData.music.artist_name}`
          followMusicAlbumName.textContent = `Album Name: ${userfollowData.music.album_name}`;
          followMusicSongName.textContent = `Song Name: ${userfollowData.music.song_name}`
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

fetchProfileData();

async function searchFriendhandler (event) {
  event.preventDeafault();
  const getAllUserData = await fetch (`/api/users/findUsers`,{
    method:"GET",
    headers: {
      "Content-Type": "application/json",
    },
  getAllUserData
  // pop the current user from array

  

  })
}

