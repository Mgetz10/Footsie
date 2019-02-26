//Main functionality

//capture Sock cards and add to array
const domSockCards = document.getElementsByClassName('sock-card');
let sockCards = [].slice.call(domSockCards);

const checkCards = () => {
  for (sock of sockCards) {
    console.log(sock.innerText);
  }
};

sockCards[0].classList.remove('hide');

const match = document.getElementById('match');
const notMatch = document.getElementById('not-match');
const nextCard = () => {
  sockCards.shift().classList.add('hide');
  sockCards[0].classList.remove('hide');
  console.log(sockCards[0]);
};
const isMatch = () => {
  console.log('lilke');
  axios
    .post('/like', { sockId: sockCards[0].children[3].innerText })
    .then(responseFromServer => {
      console.log(responseFromServer.data);
    });
  console.log(sockCards[0].children[3].innerText);
  nextCard();
};
const isNotMatch = () => {
  console.log(sockCards[0].children[3].innerText);
  nextCard();
};

match.addEventListener('click', isMatch, false);
notMatch.addEventListener('click', isNotMatch, false);
