export default function decorate(block) {
  const link = block.querySelector('a');

  if (!link) {
    block.innerHTML = '<p>No video URL provided.</p>';
    return;
  }

  const videoUrl = link.href;

  block.innerHTML = '';

  const video = document.createElement('video');

  video.src = videoUrl;
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';

  block.append(video);
}