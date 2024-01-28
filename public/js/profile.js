const showProfileBtn = document.querySelector(".show-profile-btn");

async function showProfileHandler(event) {
  event.preventDefault();
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
    } else {
      console.log("Failed to fetch user data");
      return;
    }
  const userName = userData.currentUser_name;
  const userEmail = userData.currentUser_email;
  const userMusicData = userData.currentUser_hasMusic;  // an array of objects
  const userFriendData = userData.currentUser_hasFriend; // an array of objects
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

// check for array.length for condition
  } catch (error) {
    console.log(error);
  }
}

showProfileBtn.addEventListener("click", showProfileHandler);
