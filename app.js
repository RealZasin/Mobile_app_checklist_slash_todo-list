import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-bc12c-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const toDoListInDB = ref(database, 'toDoList')

const button = document.getElementById('add-button');
const inputField = document.getElementById('input-field');
const itemList = document.getElementById("itemList");

button.addEventListener('click', function() {
  let inputValue = inputField.value;

  push(toDoListInDB, inputValue)
  
   clearInputFieldEl()

  //      |||TWO WAS OF DOING IT |||
  // 1:
  // const templateString = `<li> ${inputValue} </li>`
  //const li = document.createElement('li');
  // li.textContent = inputValue;
  // document.getElementById('itemList').appendChild(li);
  
  //2:

  // itemList.innerHTML += `<li> ${inputValue} </li>`

  // inputField.value = '';
});

onValue(toDoListInDB, function (snapshot) {
  let itemsArray = snapshot.val();

  clearItemListEl();

  if (itemsArray) {
    for (let itemID in itemsArray) {
      let currentItemValue = itemsArray[itemID];
      appendItemToToDoListEl(itemID, currentItemValue);
    }
  } else {
    itemList.innerHTML = "Nothing here yet";
  }
});


function clearItemListEl() {
  itemList.innerHTML = ""
}

function appendItemToToDoListEl(itemID, itemValue) {
  const newLi = document.createElement("li");

  newLi.textContent = itemValue;

  newLi.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `toDoList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  itemList.appendChild(newLi);
}


function clearInputFieldEl() {
  inputField.value = ""
}

