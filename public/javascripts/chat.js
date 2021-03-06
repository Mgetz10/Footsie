const sendButton = document.getElementById('send-button');
const newMessage = document.getElementById('new-message');
const chatID = window.location.pathname.split('/').pop();
const domMessages = document.getElementById('dom-messages');

const addNewMessage = (user, newmessage) => {
  let newMessageDiv = document.createElement('div');
  let theNewMessage = `${user}: ${newmessage}`;
  let textNode = document.createTextNode(theNewMessage);
  newMessageDiv.classList.add('message');
  newMessageDiv.appendChild(textNode);
  domMessages.appendChild(newMessageDiv);
};

const sendMessage = () => {
  axios
    .post('/messages', {
      newMessage: newMessage.value,
      chatID: chatID
    })
    .then(response => {
      newMessage.value = '';
    });
};
sendButton.addEventListener('click', sendMessage, false);

const updateMessages = () => {
  axios.post('/update', { chatID: chatID }).then(incomingMessages => {
    newMessages = incomingMessages.data;
    printedMessages = domMessages.childElementCount;
    if (newMessages.length !== printedMessages) {
      for (let i = printedMessages; i < newMessages.length; i++) {
        addNewMessage(newMessages[i].user, newMessages[i].message);
      }
    }
  });
};
setInterval(updateMessages, 100);
