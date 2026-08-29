export default function decorate(block) {
  const url = block.querySelector('a')?.href || block.textContent.trim();

  if (!url) return;

  let embedUrl = '';

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/
  );

  if (youtubeMatch) {
    embedUrl = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Twitter / X
  const twitterMatch = url.match(
    /(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/
  );

  if (twitterMatch) {
    const blockquote = document.createElement('blockquote');
    blockquote.className = 'twitter-tweet';

    const link = document.createElement('a');
    link.href = url;
    link.textContent = url;

    blockquote.append(link);
    block.replaceChildren(blockquote);

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';

    block.append(script);
    return;
  }

  // YouTube iframe
  if (embedUrl) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-video';

    const iframe = document.createElement('iframe');

    iframe.src = embedUrl;
    iframe.title = 'Embedded video';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    wrapper.append(iframe);
    block.replaceChildren(wrapper);
  }
}