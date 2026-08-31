export default function decorate(block) {
  const link = block.querySelector('a');

  if (!link) return;

  const video = document.createElement('video');

  video.controls = true;
  video.preload = 'metadata';
  video.src = link.href;

  link.replaceWith(video);
}