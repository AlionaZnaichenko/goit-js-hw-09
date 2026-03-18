const form = document.querySelector('.feedback-form');
const KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

function load() {
  const savedString = localStorage.getItem(KEY);
  if (savedString === null) {
    return;
  }
  let savedObject;
  try {
    savedObject = JSON.parse(savedString);
  } catch (error) {
    return;
  }
  if (savedObject.email) {
    formData.email = savedObject.email.trim();
  } else {
    formData.email = '';
  }
  if (savedObject.message) {
    formData.message = savedObject.message.trim();
  } else {
    formData.message = '';
  }
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

function save(evt) {
  const field = evt.target.name;
  const value = evt.target.value.trim();
  if (field === 'email') {
    formData.email = value;
  }
  if (field === 'message') {
    formData.message = value;
  }
  localStorage.setItem(KEY, JSON.stringify(formData));
}

function onSubmit(evt) {
  evt.preventDefault();
  const emailValue = formData.email.trim();
  const messageValue = formData.message.trim();
  if (emailValue === '' || messageValue === '') {
    alert('Fill please all fields');
    return;
  }
  console.log({
    email: emailValue,
    message: messageValue,
  });
  localStorage.removeItem(KEY);
  form.reset();
  formData.email = '';
  formData.message = '';
}

load();

form.addEventListener('input', save);
form.addEventListener('submit', onSubmit);
