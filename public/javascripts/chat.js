const sendButton = document.getElementById('send-button');
const newMessage = document.getElementById('new-message');
const sendMessage = () => {
  console.log(newMessage.innerText);
};
sendButton.addEventListener('click', isMatch, false);
// axios
//     .post('/match', {
//       sockId: sockCards[0].children[3].innerText,
//       currentSock: currentSock
//     })
//     .then(responseFromServer => {
//       if (responseFromServer.data.matchResult) {
//         alert("it's a match!!");
//       }
//       console.log(responseFromServer.data.matchResult);
//     });
