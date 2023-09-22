const button = document.getElementById('add-button');
const inputField = document.getElementById('input-field');

button.addEventListener('click', function() {
  const inputValue = inputField.value;
  console.log(inputValue);
});