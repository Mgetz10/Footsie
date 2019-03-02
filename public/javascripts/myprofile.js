const newSockButton = document.getElementById('add-new-sock')
const newSockDiv = document.getElementById('add-new-sock-div')
const submitSock = () => {
  const newInput = document.getElementById('new-input')
  const path = newInput.value.split('\\')
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
}
const creatSockForm = () => {
  newSockDiv.innerHTML = ''
  let newForm = document.createElement('form')
  let newInput = document.createElement('input')
  let newButton = document.createElement('button')
  newForm.setAttribute('action', '/addsock')
  newForm.setAttribute('method', 'POST')
  // newButton.setAttribute('type', 'button');
  newForm.setAttribute('enctype', 'multipart/form-data')
  newForm.setAttribute('class', 'flex')
  newForm.classList.add('column')
  newButton.innerHTML = 'add'
  newInput.setAttribute('type', 'file')
  newInput.setAttribute('name', 'photo')
  newInput.setAttribute('id', 'new-input')
  newForm.appendChild(newInput)
  newForm.appendChild(newButton)
  newSockDiv.appendChild(newForm)
}
const userSockCards = document.getElementsByClassName('user-sockcard')
for (let i = 0; i < userSockCards.length; i++) {
  const deleteButton = document.createElement('span')
  const deleteSymbol = document.createTextNode('X')
  deleteButton.setAttribute('class', 'delete')
  deleteButton.appendChild(deleteSymbol)

  userSockCards[i].addEventListener('mouseenter', () => {
    userSockCards[i].appendChild(deleteButton)
    deleteButton.addEventListener('click', () => {
      axios
        .post('/removesock', {
          sockId: userSockCards[i].lastElementChild.id,
        })
        .then(response => {
          console.log(response.data)
          userSockCards[i].parentElement.removeChild(userSockCards[i])
        })
    })
  })
  userSockCards[i].addEventListener('mouseleave', () => {
    userSockCards[i].removeChild(deleteButton)
  })
}
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

newSockButton.addEventListener('click', creatSockForm, false)
