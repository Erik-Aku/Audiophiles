const {Music} = require("../../models/index.js");

const musicData = [
    {
    artist_name: "artistName1",
    album_name:"albumName1",
    album_image: "url1",  
},
{
    artist_name: "artistName2",
    album_name:"albumName2",
    album_image: "url2",  
},    
{
    artist_name: "artistName3",
    album_name:"albumName3",
    album_image: "url3", 
}
]

const seedMusic = () => Music.bulkCreate(musicData);

module.exports = seedMusic;