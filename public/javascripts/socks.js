//Main functionality

//capture Sock cards and add to array
const domSockCards = document.getElementsByClassName('sock-card');
let sockCards = [].slice.call(domSockCards);

sockCards[0].classList.remove('hide');

const match = document.getElementById('match');
const notMatch = document.getElementById('not-match');
const nextCard = () => {
  sockCards.shift().classList.add('hide');
  sockCards[0].classList.remove('hide');
};
const isMatch = () => {
  axios
    .post('/match', {
      sockId: sockCards[0].children[2].innerText,
      currentSock: currentSock
    })
    .then(responseFromServer => {
      if (responseFromServer.data.matchResult) {
        alert("it's a match!!");
      }
    });
  nextCard();
};
const isNotMatch = () => {
  axios
    .post('/notmatch', {
      sockId: sockCards[0].children[2].innerText,
      currentSock: currentSock
    })
    .then(responseFromServer => {});
  nextCard();
};

match.addEventListener('click', isMatch, false);
notMatch.addEventListener('click', isNotMatch, false);

// window.document.onload = () => {
const userSocks = document.getElementsByClassName('user-sockcard');
let currentSock = userSocks[0].lastElementChild.id;

for (let i = 0; i < userSocks.length; i++) {
  if (i === 0) {
    userSocks[i].classList.add('active');
  }
  userSocks[i].addEventListener(
    'click',
    () => {
      currentSock = userSocks[i].lastElementChild.id;
    },
    false
  );
}
