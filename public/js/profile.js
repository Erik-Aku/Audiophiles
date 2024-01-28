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
      console.log(userData);

      //const profileContainer = document.createElement("span");
      const userName = document.createElement("span");
      const userEmail = document.createElement("span");
      const userMusic = document.createElement("ul");
      const userFriend = document.createElement("ul");

      userName.textContent = " " + userData.currentUser_name;
      userEmail.textContent = " " + userData.currentUser_email;

      classUserName.appendChild(userName);
      classUserEmail.appendChild(userEmail);

      const userMusicData = userData.currentUser_hasMusic;
      const userFriendData = userData.currnetUser_hasFriend;
      // check for array.length for condition
      if (userMusicData !== undefined && userMusicData !== null) {
        for (i = 0; i < userMusicData.length; i++) {
          const music = user
        }
      }

      if (userFriendData !== undefined && userMusicData !== null) {
        for (i = 0; i < userFriendData.length; i++) {}
      }
    }
  } catch (error) {
    console.log(error);
  }
};

fetchProfileData();

// an array of objects
/* 
 music= {
        music_id: item.id,
        artist_name: item.artist_name,
        album_name: item.album_name,
        album_image: item.album_image,
        } 
currentUser_hasFriend: {
        friends_id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        music: item.music.map() 
}
*/
