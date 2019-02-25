const domNameTags = document.getElementsByClassName('name-tag');
const domSockCards = document.getElementsByClassName('sock-card');
let nameTags = [].slice.call(domNameTags);
let sockCards = [].slice.call(domSockCards);

nameTags[0].classList.remove('hide');
sockCards[0].classList.remove('hide');

const match = document.getElementById('match');
const notMatch = document.getElementById('not-match');
const isMatch = () => {
  nameTags.shift().classList.add('hide');
  sockCards.shift().classList.add('hide');
  nameTags[0].classList.remove('hide');
  sockCards[0].classList.remove('hide');
};
const isNotMatch = () => {
  nameTags.shift();
  sockCards.shift();
  nameTags[0].classList.remove('hide');
  sockCards[0].classList.remove('hide');
};

match.addEventListener('click', isMatch, false);
notMatch.addEventListener('click', isNotMatch, false);
