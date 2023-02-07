
// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function fetchDetails(e) {
  axios.get('https://crudcrud.com/api/257296b736d04d12be23af361e1f9988/users')  
    .then(res => {
      if(res.data[0]) {
        res.data.forEach(user => {
          printDetails(e, user.name, user.email);
        })
      }
    })
}

function saveUser(obj) {
  axios.post('https://crudcrud.com/api/257296b736d04d12be23af361e1f9988/users', obj)
    .then(e => console.log(e))
    .catch(e => alert(e));
}

function userHandler(e, editor) {
  let userData = e.target.parentElement.innerText;
  users.removeChild(e.target.parentElement);

  let userName = userData.split(' - ')[0];

  axios.get('https://crudcrud.com/api/257296b736d04d12be23af361e1f9988/users')  
    .then(res => {
      res.data.forEach(e => {
        if(e.name === userName) {
          if(editor) {
            uName.value = e.name;
            email.value = e.email;
            phone.value = e.phone;
            date.value = e.date;
            time.value = e.time;
          }
          axios.delete(`https://crudcrud.com/api/257296b736d04d12be23af361e1f9988/users/${e._id}`)
            .then(e => console.log(e))
            .catch(e => alert(e));
        }
      });
    })
    .catch(e => alert(e));
}

const uName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.querySelector("[type='date']");
const time = document.querySelector("[type='time']");

const users = document.querySelector('.users');


function printDetails(e, userName, uMail) {
  e.preventDefault();

  const p = document.createElement('p');
  const deleteBtn = document.createElement('input');
  const editBtn = document.createElement('input');

  if (userName && uMail) 
    p.textContent = userName + " - " + uMail;
  else
    p.textContent = uName.value + " - " + email.value;

  deleteBtn.className = 'delete btn btn-danger m-2 btn-sm';
  deleteBtn.type = 'button';
  deleteBtn.value = 'Delete';
  editBtn.className = 'edit btn btn-success m-2 btn-sm';
  editBtn.type = 'button';
  editBtn.value = 'Edit';

  p.appendChild(editBtn);
  p.appendChild(deleteBtn);
  users.appendChild(p);
  
  if (!userName && !uMail) {
    const obj = {
      name: uName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      date: date.value.trim(),
      time: time.value.trim()
    }

    uName.value = '';
    email.value = '';
    phone.value = '';
    date.value = '';
    time.value = '';

    console.log(obj);
    saveUser(obj);
  }
}

users.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) 
    userHandler(e, false);

  if (e.target.classList.contains('edit')) 
    userHandler(e, true);
})