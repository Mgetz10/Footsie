const newSockButton = document.getElementById('add-new-sock');
const newSockDiv = document.getElementById('add-new-sock-div');
const submitSock = () => {
  const newInput = document.getElementById('new-input');
  const path = newInput.value.split('\\');
};
const createSockForm = () => {
  newSockDiv.innerHTML = '';
  let newForm = document.createElement('form');
  let newInput = document.createElement('input');
  let newButton = document.createElement('button');
  newForm.setAttribute('action', '/addsock');
  newForm.setAttribute('method', 'POST');
  newForm.setAttribute('enctype', 'multipart/form-data');
  newForm.setAttribute('class', 'flex');
  newForm.classList.add('column');
  newButton.innerHTML = 'add';
  newInput.setAttribute('type', 'file');
  newInput.setAttribute('name', 'photo');
  newInput.setAttribute('id', 'new-input');
  newForm.appendChild(newInput);
  newForm.appendChild(newButton);
  newSockDiv.appendChild(newForm);
};
const userSockCards = document.getElementsByClassName('user-sockcard');
if (document.getElementById('id')) {
  const domExes = document.getElementsByClassName('exes');
  const exes = [].slice.call(domExes);
  const deleteSock = () => {
    let currentSock = document.getElementById('id').innerHTML;
    console.log('ok', currentSock);
    axios
      .post('/removesock', {
        sockId: currentSock
      })
      .then(responseFromServer => {
        console.log(responseFromServer);
      });
  };
  exes.forEach(element => {
    element.addEventListener('click', deleteSock, false);
  });
}

function getElementIndex(node) {
  var index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}
newSockButton.addEventListener('click', createSockForm, false);
