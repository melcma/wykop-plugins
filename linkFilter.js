// ==UserScript==
// @name     WykopLinkFilter
// @version  1
// @grant    Melcma
// ==/UserScript==

// config

// types: warning/accepted/banned
const markedUrls = [
  {
  	url: 'wp.pl',
    type: 'warning'
  },
  {
    url: 'liveleak.com',
    type: 'accepted'
  },
  {
    url: 'youtube.com',
    type: 'accepted'
  },
  {
    url: 'youtu.be',
    type: 'accepted'
  },
  {
    url: 'polsatnews.pl',
    type: 'banned'
  }
];

const colourMap = {
  night: {
    warning: '#3c2c2c',
    accepted: '#2c3c2c'
  },
  day: {
    warning: '#ffdddd',
    accepted: '#aaffaa'
  }
};

// logic
const theme = document.getElementsByTagName('body')[0].classList.contains('night') ? 'night' : 'light';
const container = document.getElementById('itemsStream');
const posts = container.getElementsByClassName('link');

Array.prototype.forEach.call(posts, function(post) {
  const source = post.querySelector('.tag.create a');

  if (!source) return;

  markedUrls.forEach(function(mark) {
    if (source.href.indexOf(mark.url) > -1) {
      if (mark.type === 'banned') {
      	post.style.display = 'none';
      } else {
        post.style.backgroundColor = colourMap[theme][mark.type];
      }
    }
  })
});