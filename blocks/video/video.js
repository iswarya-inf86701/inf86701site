export default function decorate(block) {
  const link = block.querySelector('a');
  const text = link?.href || block.textContent.trim();

  if (!text) {
    block.innerHTML = '<p>No video URL provided.</p>';
    return;
  }

  let videoUrl = text;
  let videoElement;

  // YouTube
  const youtubeMatch = videoUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
  );

  if (youtubeMatch) {
    const videoId = youtubeMatch[1];

    videoElement = document.createElement('iframe');
    videoElement.src = `https://www.youtube.com/embed/${videoId}`;
    videoElement.title = 'YouTube video';
    videoElement.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    videoElement.allowFullscreen = true;
  }

  // Vimeo
  const vimeoMatch = videoUrl.match(
    /vimeo\.com\/(?:video\/)?(\d+)/
  );

  if (!videoElement && vimeoMatch) {
    const videoId = vimeoMatch[1];

    videoElement = document.createElement('iframe');
    videoElement.src = `https://player.vimeo.com/video/${videoId}`;
    videoElement.title = 'Vimeo video';
    videoElement.allow =
      'autoplay; fullscreen; picture-in-picture';
    videoElement.allowFullscreen = true;
  }

  // Direct MP4/WebM/Ogg video
  if (!videoElement && /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoUrl)) {
    videoElement = document.createElement('video');

    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.playsInline = true;
    videoElement.preload = 'metadata';
  }

  // Unsupported URL
  if (!videoElement) {
    block.innerHTML = `
      <p class="video-error">
        Unsupported video URL.
      </p>
    `;
    return;
  }

  block.innerHTML = '';
  block.append(videoElement);
}