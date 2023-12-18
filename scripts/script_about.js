document.querySelector('.video-container').addEventListener('click', function() {
    this.classList.toggle('tapped');
    let video = this.querySelector('video');
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});