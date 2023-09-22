const button = document.getElementById('add-button');
const inputField = document.getElementById('input-field');
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-bc12c-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const toDoListInDB = ref(database, 'toDoList')

button.addEventListener('click', function() {
  const inputValue = inputField.value;

  push(toDoListInDB, inputValue)

  console.log(`${inputValue} added to database`);

  const li = document.createElement('li');
  li.textContent = inputValue;
  document.getElementById('itemList').appendChild(li);

});