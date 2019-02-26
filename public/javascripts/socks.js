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
};
const isMatch = () => {
  axios
    .post('/match', {
      sockId: sockCards[0].children[3].innerText,
      currentSock: currentSock
    })
    .then(responseFromServer => {
      if (responseFromServer.data.matchResult) {
        alert("it's a match!!");
      }
      console.log(responseFromServer.data.matchResult);
    });
  nextCard();
};
const isNotMatch = () => {
  axios
    .post('/notmatch', {
      sockId: sockCards[0].children[3].innerText,
      currentSock: currentSock
    })
    .then(responseFromServer => {
      console.log(responseFromServer.data);
    });
  nextCard();
};

match.addEventListener('click', isMatch, false);
notMatch.addEventListener('click', isNotMatch, false);

const sockOne = document.getElementById('Sock-1');
const sockTwo = document.getElementById('Sock-2');

sockOneId = sockOne.children[1].id;
sockTwoId = sockTwo.children[1].id;
let currentSock = sockOne.children[1].id;

sockOne.addEventListener(
  'click',
  () => {
    currentSock = sockOneId;
  },
  false
);
sockTwo.addEventListener(
  'click',
  () => {
    currentSock = sockTwoId;
  },
  false
);
