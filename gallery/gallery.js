document.addEventListener('DOMContentLoaded', function () {
  const basePath = '.'; // gallery/ is current folder
  fetch(basePath + '/gallery.json')
    .then(res => res.json())
    .then(data => {
      if (document.getElementById('photos-grid')) renderPhotos(data.photos);
      if (document.getElementById('videos-list')) renderVideos(data.videos);
    })
    .catch(err => console.error('Failed to load gallery.json', err));

  function renderPhotos(photos) {
    const grid = document.getElementById('photos-grid');
    grid.innerHTML = '';
    photos.forEach(p => {
      const a = document.createElement('a');
      a.href = p.src;
      a.target = '_blank';
      a.rel = 'noopener';
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '6px';
      a.appendChild(img);
      const wrapper = document.createElement('div');
      wrapper.style.padding = '4px';
      wrapper.appendChild(a);
      grid.appendChild(wrapper);
    });
  }

  function renderVideos(videos) {
    const list = document.getElementById('videos-list');
    list.innerHTML = '';
    videos.forEach(v => {
      const wrap = document.createElement('div');
      wrap.className = 'video-embed';
      wrap.style.marginBottom = '1rem';
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(v.id);
      iframe.title = v.title || 'Video';
      iframe.loading = 'lazy';
      iframe.frameBorder = '0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.style.width = '100%';
      iframe.style.aspectRatio = '16/9';
      wrap.appendChild(iframe);
      list.appendChild(wrap);
    });
  }
});
