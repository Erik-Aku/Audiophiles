const {Music} = require("../models/index.js");

const musicData = [
    {
    artist_name: "artistName1",
    album_name:"albumName1",
    album_image: "url1",
    song_name:"songName1",
    music_link:"musicUrl1",
},
{
    artist_name: "artistName2",
    album_name:"albumName2",
    album_image: "url2",  
    song_name:"songName2",
    music_link:"musicUrl2",
},    
{
    artist_name: "artistName3",
    album_name:"albumName3",
    album_image: "url3", 
    song_name:"songName3",
    music_link:"musicUrl3",
}
]

const seedMusic = () => Music.bulkCreate(musicData);

module.exports = seedMusic;