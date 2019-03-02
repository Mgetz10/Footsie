//Main functionality

//capture Sock cards and add to array
const domSockCards = document.getElementsByClassName('sock-card')
let sockCards = [].slice.call(domSockCards)

const checkCards = () => {
  for (sock of sockCards) {
    console.log(sock.innerText)
  }
}

sockCards[0].classList.remove('hide')

const match = document.getElementById('match')
const notMatch = document.getElementById('not-match')
const nextCard = () => {
  sockCards.shift().classList.add('hide')
  sockCards[0].classList.remove('hide')
}
const isMatch = () => {
  axios
    .post('/match', {
      sockId: sockCards[0].children[2].innerText,
      currentSock: currentSock,
    })
    .then(responseFromServer => {
      if (responseFromServer.data.matchResult) {
        alert("it's a match!!")
      }
      console.log(responseFromServer.data.matchResult)
    })
  nextCard()
}
const isNotMatch = () => {
  axios
    .post('/notmatch', {
      sockId: sockCards[0].children[2].innerText,
      currentSock: currentSock,
    })
    .then(responseFromServer => {
      console.log(responseFromServer.data)
    })
  nextCard()
}

match.addEventListener('click', isMatch, false)
notMatch.addEventListener('click', isNotMatch, false)

// window.document.onload = () => {
const userSocks = document.getElementsByClassName('user-sockcard')
let currentSock = userSocks[0].lastElementChild.id

for (let i = 0; i < userSocks.length; i++) {
  if (i === 0) {
    userSocks[i].classList.add('active')
  }
  userSocks[i].addEventListener(
    'click',
    () => {
      currentSock = userSocks[i].lastElementChild.id
      console.log(currentSock)
    },
    false
  )
}
// switch (userSocks.length) {
//   case 8:
//     const sockEight = document.getElementById('Sock-8');
//   case 7:
//     const sockSeven = document.getElementById('Sock-7');
//   case 6:
//     const sockSix = document.getElementById('Sock-6');
//   case 5:
//     const sockFive = document.getElementById('Sock-5');
//   case 4:
//     const sockFour = document.getElementById('Sock-4');
//   case 3:
//     const sockThree = document.getElementById('Sock-3');
//   case 2:
//     const sockTwo = document.getElementById('Sock-2');
//   case 1:
//     const sockOne = document.getElementById('Sock-1');
// }

// switch (userSocks.length) {
//   case 8:
//     const sockEightId = sockTwo.children[1].id;
//   case 7:
//     const sockSevenId = sockTwo.children[1].id;
//   case 6:
//     const sockSixId = sockTwo.children[1].id;
//   case 5:
//     const sockFiveId = sockTwo.children[1].id;
//   case 4:
//     const sockFourId = sockTwo.children[1].id;
//   case 3:
//     const sockThreeId = sockTwo.children[1].id;
//   case 2:
//     const sockTwoId = sockTwo.children[1].id;
//   case 1:
//     const sockOneId = sockOne.id;
// }
// // };

// let currentSock = sockOne.children[1].id;

// sockOne.addEventListener(
//   'click',
//   () => {
//     currentSock = sockOneId;
//   },
//   false
// );
// sockTwo.addEventListener(
//   'click',
//   () => {
//     currentSock = sockTwoId;
//   },
//   false
// );
// sockThree.addEventListener(
//   'click',
//   () => {
//     currentSock = sockThreeId;
//   },
//   false
// );
// sockFour.addEventListener(
//   'click',
//   () => {
//     currentSock = sockFourId;
//   },
//   false
// );
// sockFive.addEventListener(
//   'click',
//   () => {
//     currentSock = sockFiveId;
//   },
//   false
// );
// sockSix.addEventListener(
//   'click',
//   () => {
//     currentSock = sockSixId;
//   },
//   false
// );
// sockSeven.addEventListener(
//   'click',
//   () => {
//     currentSock = sockSevenId;
//   },
//   false
// );
// sockEight.addEventListener(
//   'click',
//   () => {
//     currentSock = sockEightId;
//   },
//   false
// );
