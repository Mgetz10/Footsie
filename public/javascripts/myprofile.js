const newSockButton = document.getElementById('add-new-sock');
const newSockDiv = document.getElementById('add-new-sock-div');
const submitSock = () => {
  const newInput = document.getElementById('new-input');
  const path = newInput.value.split('\\');
  // axios
  //   .post('/addsock', {
  //     url: path[path.length - 1]
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //   });
  // axios({
  //   url: '/addsock',
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data'
  //   }
  // }).then(response => {
  //   console.log(response.data);
  // });
  //console.log(path[path.length - 1]);
};
const creatSockForm = () => {
  newSockDiv.innerHTML = '';
  let newForm = document.createElement('form');
  let newInput = document.createElement('input');
  let newButton = document.createElement('button');
  newForm.setAttribute('action', '/addsock');
  newForm.setAttribute('method', 'POST');
  // newButton.setAttribute('type', 'button');
  newForm.setAttribute('enctype', 'multipart/form-data');
  newButton.innerHTML = 'add';
  newInput.setAttribute('type', 'file');
  newInput.setAttribute('name', 'photo');
  newInput.setAttribute('id', 'new-input');
  newForm.appendChild(newInput);
  newForm.appendChild(newButton);
  newSockDiv.appendChild(newForm);
};
// const addNewSock = () => {
//   let url = prompt('Please enter your picture url', 'URL');
//   axios
//     .post('/addsock', {
//       URL: url
//     })
//     .then(response => {
//       console.log(response.data);
//     });
//   console.log('ur cool');
// };

newSockButton.addEventListener('click', creatSockForm, false);
