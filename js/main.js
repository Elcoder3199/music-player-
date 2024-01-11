let progress = document.getElementById("progress"),
  song = document.getElementById("song"),
  ctrlIcon = document.getElementById("ctrlIcon"),
  uploadFiles = document.querySelector(".upload-files #upload"),
  container = document.querySelector(".container");

uploadFiles.onchange = function () {
    if (song.pause()) {
        ctrlIcon.click()
        ctrlIcon.classList.add("fa-play")
        song.play()
    }
    if (song.play()) {
        ctrlIcon.classList.add("fa-pause")
        ctrlIcon.click()
        song.pause()
    }
    container.classList.remove("hide");
    document.querySelector(".song-title").textContent = song.nodeName;
    let fileAudio = new FileReader();
    fileAudio.readAsDataURL(uploadFiles.files[0]);
    fileAudio.onload = function () {
        song.src = fileAudio.result;
    };
};

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 300);
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

document.addEventListener("keyup", (e) => {
  if (e.key === " ") {
    ctrlIcon.click();
    e.preventDefault();
  }
  if (e.key === "ArrowRight") {
    song.currentTime += 3;
  }
  if (e.key === "ArrowLeft") {
    song.currentTime -= 3;
  }
});
