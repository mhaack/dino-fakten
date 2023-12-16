/*
 * Video Block
 * Show a video referenced by a link
 * https://www.hlx.live/developer/block-collection/video
 */

getVideoElement = (source, autoplay) => {
  const video = document.createElement('video');
  video.setAttribute('controls', '');
  if (autoplay) video.setAttribute('autoplay', '');

  const sourceEl = document.createElement('source');
  sourceEl.setAttribute('src', source);
  sourceEl.setAttribute('type', `video/${source.split('.').pop()}`);
  video.append(sourceEl);

  return video;
};

export default async function decorate(block) {
  const a = block.querySelector('a');
  if (a) {
    const pic = block.querySelector('picture');
    if (pic) {
      const wrapper = document.createElement('div');
      wrapper.className = 'video-placeholder';
      wrapper.innerHTML = '<div class="video-placeholder-play"><button title="Play"></button></div>';
      wrapper.prepend(pic);
      wrapper.addEventListener('click', () => {
        block.innerHTML = '';
        wrapper.replaceWith(getVideoElement(a.href, true));
      });
      block.append(wrapper);
    } else {
      const source = a.href;
      block.innerHTML = '';
      block.append(getVideoElement(source, false));
    }
  }
}
