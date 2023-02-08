
//! AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const FORM = document.forms[0];
const CRUDLINK = 'https://crudcrud.com/api';
const CRUDKEY = '5ad575d3692f4efd9e960c079b1dd206';
const CRUDRESOURCE = 'appointment';

const uName = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.querySelector("[type='date']");
const time = document.querySelector("[type='time']");
const users = document.querySelector('.users');

const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editPhone = document.getElementById('editPhone');
const editDate = document.getElementById('editDate');
const editTime = document.getElementById('editTime');
const hiddenId = document.querySelector('.hiddenid');
const saveChangesBtn = document.querySelector('.saveDetails');


FORM.addEventListener('submit', printDetails);

// window.addEventListener('DOMContentLoaded', fetchDetails);

users.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) 
    deleteUser(e);

  if (e.target.classList.contains('edit')) 
    showPopUp(e);
  
})

saveChangesBtn.addEventListener('click', (e) => {
  const id = hiddenId.textContent;
  const obj = {
    name: editName.value.trim(),
    email: editEmail.value.trim(),
    phone: editPhone.value.trim(),
    date: editDate.value.trim(),
    time: editTime.value.trim()
  }

  saveChangesBtn.previousElementSibling.click();
  printDetails(e, obj.name, obj.email, obj.phone, obj.date, obj.time, id);
  updateUser(obj, id);
  console.log(id);
})


//! fetch detils function
function fetchDetails(e) {
  axios.get(`${CRUDLINK}/${CRUDKEY}/${CRUDRESOURCE}`)  
    .then(res => {
      if(res.data[0]) {
        res.data.forEach(user => {
          printDetails(e, user.name, user.email, user.phone, user.date, user.time, user._id);
        })
      }
    })
    .catch(e => alert(e));
}

//! save user function
function saveUser(obj, p) {
  axios.post(`${CRUDLINK}/${CRUDKEY}/${CRUDRESOURCE}`, obj)
    .then(e => {
      console.log(e);
      p.id = e.data._id;
    })
    .catch(e => alert(e));
}

//! delete user function
function deleteUser(e) {
  const id = e.target.parentElement.id;
  users.removeChild(e.target.parentElement);

  axios.delete(`${CRUDLINK}/${CRUDKEY}/${CRUDRESOURCE}/${id}`)
    .then(e => console.log(e))
    .catch(e => alert(e));
}

//! update user function
function updateUser(obj, id) {
  axios.put(`${CRUDLINK}/${CRUDKEY}/${CRUDRESOURCE}/${id}`, obj)
    .then(e => console.log(e))
    .catch(e => alert(e));
}

//! show pop up function
function showPopUp(e) {
  const userData = e.target.parentElement.innerText.split(' - ');

  users.removeChild(e.target.parentElement);
  hiddenId.textContent = e.target.parentElement.id;
  editName.value = userData[0];
  editEmail.value = userData[1];
  editPhone.value = userData[2];
  editDate.value = userData[3];
  editTime.value = userData[4];
}

//! print function
function printDetails(e, userName, uMail, uPhone, Date, Time, uId) {
  e.preventDefault();

  const p = document.createElement('p');
  const deleteBtn = document.createElement('input');
  const editBtn = document.createElement('input');
  let content;

  if (uMail) {
    content = userName + " - " + uMail + " - " + uPhone + " - " + Date + " - " + Time;
    p.id = uId;
  } else
    content = uName.value + " - " + email.value + " - " + phone.value + " - " + date.value + " - " + time.value;

  p.textContent = content;
  deleteBtn.className = 'delete btn btn-danger m-2 btn-sm';
  deleteBtn.type = 'button';
  deleteBtn.value = 'Delete';
  editBtn.className = 'edit btn btn-success m-2 btn-sm';
  editBtn.type = 'button';
  editBtn.value = 'Edit';
  editBtn.setAttribute('data-bs-toggle', "modal");
  editBtn.setAttribute('data-bs-target', "#exampleModal");


  p.appendChild(editBtn);
  p.appendChild(deleteBtn);
  users.appendChild(p);
  
  if (!uMail) {
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

    // console.log(obj);
    saveUser(obj, p);
  }
}
