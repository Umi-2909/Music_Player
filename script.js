console.log("Welcome to ZingMP3");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Forget Me Now - Fishy ft. Trí Dũng「Cukak Remix」", filePath: "songs/song1.mp3", coverPath: "covers/1.jpg"},
    {songName: "KÉM DUYÊN | RUM X NIT X MASEW", filePath: "songs/song2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Người Em Cố Đô (Orinn Remix) - Rum x Đaa", filePath: "songs/song3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Tấm Lòng Son Remix - H-Kray x Đại Mèo Remix", filePath: "songs/song4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Vương Vấn Remix - Qinn Remix x TVk x Hana Cẩm Tiên", filePath: "songs/song5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Phố Đã Lên Đèn (Orinn Remix) - Huyền Tâm Môn", filePath: "songs/song6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Chạy Về Khóc Với Anh - Erik「Cukak Remix」", filePath: "songs/song7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Lần Hẹn Hò Đầu Tiên (JuongB x Heliøs Remix)", filePath: "songs/song8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Gu - Freaky ft. Seachains「Cukak Remix」", filePath: "songs/song9.mp3", coverPath: "covers/9.jpg"},
    {songName: "HEATHENS REMIX", filePath: "songs/song10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
      makeAllPlays();
      songIndex = i;
      let songItemPlay = e.currentTarget.getElementsByClassName('songItemPlay')[0];
      songItemPlay.classList.remove('fa-play-circle');
      songItemPlay.classList.add('fa-pause-circle');
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');

      Array.from(document.getElementsByClassName('songItem')).forEach((item) => {
        item.classList.remove('playing');
      });

      element.classList.add('playing');
    });
  });

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
audioElement.addEventListener('ended', () => {
  // SongId next
  songIndex++;

  // Return first song
  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;

  // Play next song
  audioElement.play();

  // Current
  markCurrentSongPlaying();
});

function markCurrentSongPlaying() {
  songItems.forEach((element) => {
    element.classList.remove('playing');
  });
  songItems[songIndex].classList.add('playing');
}
